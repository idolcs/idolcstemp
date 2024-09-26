<?php

namespace App\Http\Controllers;

use App\Models\Resource;
use App\Models\User;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ResourceController extends Controller
{
    //

    public function newResource(Request $request)
    {

        if (!$request->semester) {
            return Response([
                "msg" => "Semester not set"
            ], 401);
        }

        if (!$request->subject) {
            return Response([
                "msg" => "Subject not set"
            ], 401);
        }

        if (!$request->title) {
            return Response([
                "msg" => "Title not set"
            ], 401);
        }

        if (!$request->file) {
            return Response([
                "msg" => "File not set"
            ], 401);
        }

        $author = User::where("remember_token", $request->bearerToken())->first();

        if (!$author) {
            return Response([
                "msg" => "User not found"
            ], 404);
        }

        $author_email = $author->email;
        $author_name = $author->name;

        $pdf = $request->file("file");
        $fileName = "note/" . time() . '-' . $pdf->getClientOriginalName();

        $operation1 = Storage::disk("local")->put($fileName, $pdf->getContent());

        if (!$operation1) {
            return Response([
                "msg" => "Failed to save file"
            ], 501);
        }


        $operation2 = Resource::create([
            "semester" => $request->semester,
            "subject" => $request->subject,
            "title" => $request->title,
            "description" => $request->description,
            "author_email" => $author_email,
            "author_name" => $author_name,
            "file" => $fileName
        ]);

        if (!$operation2) {
            return Response([
                "msg" => "Failed to save details"
            ], 501);
        }

        return Response([
            "msg" => "Success"
        ], 200);
    }


    public function getResource(Request $request)
    {
        $resources = Resource::all();
        return Response($resources, 200);
    }


    public function deleteResource(Request $request){

        $body = json_decode($request->getContent(), true);

        if(!isset($body["id"])){
            return Response([
                "msg" => "ID not provided"
            ], 401);
        }

        $resource = Resource::where("id", $body["id"])->first();

        if(!$resource){
            return Response([
                "msg" => "Resource not found"
            ], 404);
        }

        $fileUrl = $resource->file;

        Storage::delete($fileUrl);

        $operation1 = $resource->delete();

        if(!$operation1){
            return Response([
                "msg" => "Failed to delete"
            ], 501);
        }

        return Response([
            "msg" => "Success"
        ], 200);

    }


}
