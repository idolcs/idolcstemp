<?php

namespace App\Http\Controllers;

use App\Models\Link;
use App\Models\Resource;
use Illuminate\Http\Request;

class LinkController extends Controller
{
    //

    public function newLink(Request $request){
        $body = json_decode($request->getContent(), true);
        
        if(!isset($body["semester"])){
            return Response([
                "msg" => "Semester is not set"
            ], 400);
        }

        if(!isset($body["subject"])){
            return Response([
                "msg" => "Subject is not set"
            ], 400);
        }

        if(!isset($body["title"])){
            return Response([
                "msg" => "Title is not set"
            ], 400);
        }

        if(!isset($body["url"])){
            return Response([
                "msg" => "URL is not set"
            ], 400);
        }

        if(!isset($body["isYoutube"])){
            return Response([
                "msg" => "isYoutube is not set"
            ], 400);
        }

        $link = Link::create([
            "semester" => $body["semester"],
            "subject" => $body["subject"],
            "title" => $body["title"],
            "url" => $body["url"],
            "is_youtube" => $body["isYoutube"]
        ]);


        if(!$link){
            return Response([
                "msg" => "failed to create link"
            ], 501);
        }
        
        return Response([
            "msg" => "Success"
        ], 200);

    }



    public function getLink(Request $request){
        $links = Link::all();
        return $links;
    }


    public function deleteLink(Request $request){

        $body = json_decode($request->getContent(), true);

        if(!isset($body["id"])){
            return Response([
                "msg" => "ID is not set"
            ], 400);
        }

        $note = Link::where("id", $body["id"])->first();

        if(!$note){
            return Response([
                "msg" => "Note not found"
            ], 404);
        }

        $operation1 = $note->delete();

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
