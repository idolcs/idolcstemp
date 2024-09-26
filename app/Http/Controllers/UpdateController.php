<?php

namespace App\Http\Controllers;

use App\Models\Update;
use App\Models\User;
use Dotenv\Loader\Resolver;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Str;

class UpdateController extends Controller
{
    public function newUpdate(Request $request)
    {
        $body = json_decode($request->getContent(), true);

        // Return body for debugging, comment out in production
        // return response()->json($body, 401); 

        // Validate slug
        if (!isset($body["slug"])) {
            return response()->json([
                "msg" => "Slug not set"
            ], 401);
        }

        // Generate slug using Str::slug()
        $sanitizedSlug = Str::slug($body["slug"]);

        // Check if slug already exists
        $duplicateSlug = Update::where("slug", $sanitizedSlug)->first();



        if ($duplicateSlug && !$body["isEdit"]) {
            return response()->json([
                "msg" => "Slug already exists"
            ], 401);
        }

        // Validate other required fields
        if (!isset($body["title"])) {
            return response()->json([
                "msg" => "Title not set"
            ], 401);
        }

        if (!isset($body["semester"])) {
            return response()->json([
                "msg" => "Semester not set"
            ], 401);
        }

        if (!isset($body["content"])) {
            return response()->json([
                "msg" => "Content not set"
            ], 401);
        }

        // Authenticate the user using bearer token
        $token = $request->bearerToken();
        $author = User::where("remember_token", $token)->first();

        // Handle case where token is invalid or user is not found
        if (!$author) {
            return response()->json([
                "msg" => "Invalid token"
            ], 403);
        }

        if($author and $body["isEdit"]){

            $oldUpdate = Update::where("slug", $body["slug"])->first();
            
            if(!$oldUpdate){
                return Response([
                    "msg" => "The update does not exist or the slug has been changed"
                ], 404);
            }

            if(!($oldUpdate->author_email == $author->email) && !($author->superadmin)){
                return Response([
                    "msg" => "Your email and the original author email do not match"
                ], 401);
            }

        }

        // Create or update the post
        $newPost = Update::updateOrCreate(
            ['slug' => $sanitizedSlug],
            [
                'title' => $body['title'],
                'semester' => $body['semester'],
                'content' => $body['content'],  // No need for addslashes()
                'author_name' => $author->name,
                'author_email' => $author->email,
                'approved' => false
            ]
        );

        if (!$newPost) {
            return response()->json([
                "msg" => "Some internal error occurred"
            ], 501);
        }

        return response()->json([
            "msg" => "Success"
        ], 200);
    }


    public function getUpdates(Request $request)
    {

        $updates = Update::all();

        return $updates;
    }


    public function approveUpdate(Request $request){

        $body = json_decode($request->getContent(), true);

        if(!isset($body["slug"])){
            return Response([
                "msg" => "Slug not set"
            ], 401);
        }

        $update = Update::where("slug", $body["slug"])->first();
        
        if(!$update){
            return Response([
                "msg" => "Update not set"
            ], 404);
        }

        $update->approved = !($update->approved);
        $operation = $update->save();

        if(!$operation){
            return Response(
                [
                    "msg" => "Failed to save"
                ],
                501
            );
        }


        return Response([
            "msg" => "Approved"
        ], 200);

    }

    public function deleteUpdate(Request $request){

        $body = json_decode($request->getContent(), true);

        if(!isset($body["slug"])){
            return Response([
                "msg" => "Slug not set"
            ], 401);
        }

        $update = Update::where("slug", $body["slug"])->first();

        if(!$update){
            return Response([
                "msg" => "Update does not exist"
            ], 404);
        }

        $operation = $update->delete();

        if(!$operation){
            return Response([
                "msg" => "Failed to delete"
            ], 501);
        }

        return Response([
            "msg" => "Update deleted successfully"
        ], 200);

    }


}
