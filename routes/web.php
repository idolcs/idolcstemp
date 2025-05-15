<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\UserController;
use App\Models\Config;
use App\Models\Link;
use App\Models\Redirect;
use App\Models\Resource;
use App\Models\Subject;
use App\Models\Update;
use App\Models\User;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request as HttpRequest;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;

Route::get('/', function (HttpRequest $request) {

    
    $calendarData = EventController::getEvents($request);
    $updates = Update::latest()->where("approved", true)->take(3)->get();
    $config = Config::first();
    return Inertia::render("Home/Home", ["activeSemesters" => $config->active_semesters, "updates" => $updates, "calendarData" => $calendarData]);
});


Route::get("/temp", function () {
    return "Hello World";
});

Route::get("/about-us", function(){
    return Inertia::render("StaticPages/AboutUs");
});

Route::get("/privacy-policy", function(){
    return Inertia::render("StaticPages/PrivacyPolicy");
});

Route::get("/terms-and-conditions", function(){
    return Inertia::render("StaticPages/TermsAndConditions");
});


Route::get("/note/{noteId}", function(string $noteid){
    $note = Resource::where("id", $noteid)->first();
    $subject = Subject::where("code", $note->subject)->first();
    return Inertia::render("Note/Note", ["note" => $note, "subject" => $subject]);
});

Route::get("/updates", function(){
    $updates = Update::where("approved", true)->latest()->get(["slug", "title", "semester"]);
    return Inertia::render("Updates/Updates", ["data" => $updates]);
});

Route::get("/updates/{updateSlug}", function(HttpRequest $request, string $updateSlug){

    $update = Update::where("slug", $updateSlug)->where("approved", true)->first(["content", "title", "created_at", "author_name"]);

    if(!$update){
        return Response([
            "msg" => "Update not found"
        ], 404);
    }

    return Inertia::render("Post/Post", ["update" => $update]);
});

Route::get("/r/{redirectId}", function(HttpRequest $request, string $redirect_id){
    $redirect = Redirect::where("id", $redirect_id)->first();
    if(!$redirect){
        return Response("Not found", 404);
    }
    return redirect($redirect->url);
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
    Route::get("/new-update", function(){
        return Inertia::render("Admin/NewUpdate/NewUpdate");
    });
    Route::get("/edit-update/{editSlug}", function(HttpRequest $request, string $editSlug){

        $update = Update::where("slug", $editSlug)->first();
    
        if(!$update){
            return Response([
                "msg" => "Slug not found"
            ], 404);
        }
    
        return Inertia::render("Admin/NewUpdate/NewUpdate", ["edit" => $update]);
    
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
        $updates = Update::where("semester", $semesterOrSubject)->where("approved", true)->latest()->get(); 
        return Inertia::render("Semester/Semester", ['semNumber' => $semesterOrSubject, 'subjects' => $subjects, 'activeSemesters' => $config->active_semesters, "updates" => $updates]);
    } else if (
        strlen($semesterOrSubject) == 3 &&
        is_numeric($semesterOrSubject)
    ) {
        $subject = Subject::where("code", $semesterOrSubject)->first();
        $subjects = Subject::where("semester", $subject->semester)->orderBy("code", "ASC")->get();
        $notes = Resource::where("subject", $semesterOrSubject)->get();
        $links = Link::where("subject", $semesterOrSubject)->get(["url", "title", "created_at"]);
        return Inertia::render("Subject/Subject", ["name" => $subject->name, "subjects" => $subjects, "semester" => $subject->semester, "notes" => $notes, "links" => $links]);
    }else{
        return "not a valid semester";
    }
});


