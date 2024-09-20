<?php

use App\Http\Controllers\UserController;
use App\Models\Config;
use App\Models\Subject;
use App\Models\User;
use Illuminate\Http\Request as HttpRequest;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;

Route::get('/', function () {
    $config = Config::first();
    return Inertia::render("Home/Home", ["activeSemesters" => $config->active_semesters]);
});


Route::get("/temp", function () {
    return "Hello World";
});

Route::get("/note", function(){
    return Inertia::render("Note/Note");
});

Route::get("/updates", function(){
    return Inertia::render("Updates/Updates");
});

Route::get("/post", function(){
    return Inertia::render("Post/Post");
});

Route::prefix("/account")->group(function(){

    Route::get("/", function(){
        return Inertia::render("Account/Account");
    });

    Route::get("/login", function(){
        return Inertia::render("Account/Login/Login");
    });

});

Route::prefix("/admin")->group(function(){
    Route::get("/", function(){
        return Inertia::render("Admin/Admin");
    });
});

Route::prefix("auth")->group(function(){
    Route::prefix("google")->group(function(){

        Route::get("/redirect", function(HttpRequest $request){
            return Socialite::driver("google")->redirect();
        });

        Route::get("/callback", [UserController::class, "CreateUserFromGoogle"]);

    });
});

Route::prefix("utils")->group(function(){
    Route::get("/savetoken", function(HttpRequest $request){
        // return dd($request->token);
        return Inertia::render('Utils/SaveToken', ["token" => $request->token]);
    });
});

Route::get("/{semesterOrSubject}", function (HttpRequest $request, string $semesterOrSubject) {
    if (
        strlen($semesterOrSubject) == 1 &&
        is_numeric($semesterOrSubject) &&
        (int)$semesterOrSubject <= 6 &&
        (int)$semesterOrSubject >= 1
    ) {
        $config = Config::first();
        $subjects = Subject::where("semester", $semesterOrSubject)->orderBy("code", "ASC")->get(['name', 'code']);
        return Inertia::render("Semester/Semester", ['semNumber' => $semesterOrSubject, 'subjects' => $subjects, 'activeSemesters' => $config->active_semesters]);
    } else if (
        strlen($semesterOrSubject) == 3 &&
        is_numeric($semesterOrSubject)
    ) {
        $subject = Subject::where("code", $semesterOrSubject)->first();
        $subjects = Subject::where("semester", $subject->semester)->orderBy("code", "ASC")->get();
        return Inertia::render("Subject/Subject", ["name" => $subject->name, "subjects" => $subjects, "semester" => $subject->semester]);
    }else{
        return "not a valid semester";
    }
});


