<?php

namespace App\Http\Controllers;

use App\Models\User;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Str;
use Nette\Utils\Random;

use function Pest\Laravel\json;

class UserController extends Controller
{
    public function CreateUserFromGoogle(Request $request)
    {
        $googleUser = Socialite::driver("google")->user();
        $user = User::updateOrCreate(
            ["google_id" => $googleUser->id],
            [
                "name" => $googleUser->name,
                "email" => $googleUser->email,
                "password" => Hash::make(Str::password(12)),
                'email_verified_at' => now(),
                'avatar' => $googleUser->avatar,
                'remember_token' => UserController::GenerateRememberToken()
            ]
        );

        Auth::login($user);

        return redirect("/utils/savetoken?token=" . $user->remember_token);
    }


    public static function GenerateRememberToken()
    {
        $token = Random::generate(100, '0-9a-zA-Z');
        $tokenAlreadyExistts = User::where("remember_token", $token)->exists();
        if ($tokenAlreadyExistts) {
            return UserController::GenerateRememberToken();
        } else {
            return $token;
        }
    }

    public function verifyRemeberToken(Request $request)
    {
        $body = json_decode($request->getContent(), true);
        // $remember_token = $body["token"];
        if (!isset($body["token"])) {
            return Response("No token provided", 400);
        }

        $user = User::where("remember_token", $body["token"])->first();

        if ($user) {
            return Response([
                "name" => $user->name,
                "email" => $user->email,
                "avatar" => $user->avatar,
                "semester" => $user->semester
            ]);
        } else {
            return Response("User not found", 404);
        }
    }

    public function isAdminCheck(Request $request)
    {
        $body = json_decode($request->getContent(), true);
        if (!isset($body["token"])) {
            return Response("No token provided", 400);
        }
        $user = User::where("remember_token", $body["token"])->first();
        if (!$user) {
            return Response("User not found", 404);
        }
        if ($user["admin"] == true || $user["superadmin"] == true) {
            return Response([
                "is_admin" => true
            ], 200);
        } else {
            return Response([
                "is_admin" => false
            ], 200);
        }
    }

    public function isSuperAdminCheck(Request $request)
    {
        $body = json_decode($request->getContent(), true);
        if (!isset($body["token"])) {
            return Response("No token provided", 400);
        }
        $user = User::where("remember_token", $body["token"])->first();
        if (!$user) {
            return Response("User not found", 404);
        }
        if ($user["superadmin"] == true) {
            return Response([
                "is_admin" => true
            ], 200);
        } else {
            return Response([
                "is_admin" => false
            ], 200);
        }
    }


    public static function isSuperAdmin(String $token)
    {
        $user = User::where("remember_token", $token)->first();
        if (!$user) {
            return false;
        }
        if (!($user["superadmin"])) {
            return false;
        }
        return true;
    }

    public function getAllMembers(Request $request)
    {
        $body = json_decode($request->getContent(), true);
        $allUsers = User::all(["name", "email", "semester","admin", "superadmin"]);

        return Response($allUsers, 200);
    }


    public function toggleSuperAdmin(Request $request){
        $body = json_decode($request->getContent(), true);

        if(!$body["targetEmail"]){
            return Response([
                "msg" => "Target email not found"
            ], 404);
        }
        $target_email = $body["targetEmail"];
        $target_state = boolval($body["targetState"]);
        $user = User::where("email", $target_email)->first();
        $user->superadmin = $target_state;
        $success = $user->save();
        if(!$success){
            return Response([
                "msg" => "Error while saving to server"
            ], 500);
        }

        return Response([
            "msg" => "Success"
        ], 200);

    }

    public function toggleAdmin(Request $request){
        $body = json_decode($request->getContent(), true);

        if(!$body["targetEmail"]){
            return Response([
                "msg" => "Target email not found"
            ], 404);
        }
        $target_email = $body["targetEmail"];
        $target_state = boolval($body["targetState"]);
        $user = User::where("email", $target_email)->first();
        $user->admin = $target_state;
        $success = $user->save();
        if(!$success){
            return Response([
                "msg" => "Error while saving to server"
            ], 500);
        }

        return Response([
            "msg" => "Success"
        ], 200);
    }

    public function changeSemester(Request $request){
        $body = json_decode($request->getContent(), true);
        $token = $body["token"];

        $user = User::where("remember_token", $token)->first();

        if(!$user){
            return Response([
                "msg" => "User not found"
            ], 404);
        }

        if(!isset($body["semester"])){
            return Response(["msg" => "Semester not set"], 401);
        }

        $targetSemester = (int)$body["semester"];
        $user->semester = $targetSemester;

        $result = $user->save();

        if(!$result){
            return Response([
                "msg" => "Error saving in the database"
            ], 501);
        }

        return Response([
            "msg" => "Success"
        ], 200);
    }

    public function getSemesterStats(Request $request){
        $body = json_decode($request->getContent(), true);

        $users = User::all(["semester"])->groupBy("semester");

        return $users;
    }

}
