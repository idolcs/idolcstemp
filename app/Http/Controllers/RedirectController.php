<?php

namespace App\Http\Controllers;

use App\Models\Redirect;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;

class RedirectController extends Controller
{
    public function newRedirect(Request $request){
        $body = json_decode($request->getContent(), true);

        if(!isset($body["url"])){
            return Response([
                "msg" => "URL not provided"
            ], 400);
        }

        $redirect = Redirect::create([
            "url" => $body["url"],
            'title' => $body["title"]
        ]);

        if(!$redirect){
            return Response([
                "msg" => "Failed to create redirect"
            ], 501);
        }

        return Response([
            "msg" => "Success",
            "id" => $redirect->id
        ], 200);

    }

    public function getLastTen(Request $request){

        $redirects = Redirect::latest()->take(10)->get();
        return Response($redirects, 200);

    }



}
