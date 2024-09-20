<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;

class SubjectController extends Controller
{
    
    public function createSubject(Request $request){
        $body = json_decode($request->getContent(), true);
        $subject = Subject::updateOrCreate(
            ["code" => $body["code"]],
            [
                "name" => $body["name"],
                "semester" => $body["semester"]
            ]
        );
        if(!$subject){
            return Response([
                "msg" => "Failed to create Subject"
            ], 501);
        }
        return Response([
            "msg"=> "Success"
        ], 200);
    }

    public function getSubjectsBySem(Request $request){
        $semester = $request->semester;
        $subjects = Subject::where("semester", $semester)->get();
        return Response($subjects, 200);
    }

    public function deleteSubject(Request $request){
        
        $body = json_decode($request->getContent(), true);

        if(!isset($body["code"])){
            return Response([
                "msg" => "Subject code not provided"
            ], 401);
        }

        $subject = Subject::where("code", $body["code"])->first();

        if(!$subject){
            return Response([
                "msg" => "Subject not found"
            ], 404);
        }

        $success = $subject->delete();

        if(!$success){
            return Response([
                "msg" => "Failed to delete the subject"
            ], 501);
        }

        return Response([
            "msg" => "Success"
        ], 200);

    }

}
