<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\LinkController;
use App\Http\Controllers\RedirectController;
use App\Http\Controllers\ResourceController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\UpdateController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\AdminVerify;
use App\Http\Middleware\SuperAdminVerify;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;


Route::prefix("/v1")->group(function () {

    // Route::prefix("/download")->group(function () {
    //     Route::get("/note/{fileUrl}", function (string $fileUrl) {
    //         $filePath = "note/" . $fileUrl;
    //         if (!Storage::exists($filePath)) {
    //             abort(404, 'File not found');
    //         }
    //         $extension = explode('.', $filePath)[array_key_last(explode('.', $filePath))];
    //         if($extension == "html" || $extension == "htm"){
    //             $content_type = 'text/html';
    //         }else if($extension == "pdf"){
    //             $content_type = 'application/pdf';
    //         }
    //         $stream = Storage::readStream($filePath);
    //         return response()->stream(function () use ($stream) {
    //             fpassthru($stream);
    //             fclose($stream);
    //         }, 200, [
    //             'Content-Type' => $content_type,
    //             'Content-Disposition' => 'inline; filename="' . basename($filePath) . '"'
    //         ]);
    //     });
    // });


Route::prefix("/download")->group(function () {
    Route::get("{fileUrl}", function (string $fileUrl) {
        $filePath = $fileUrl;

        // Use the R2 disk now
        $disk = Storage::disk('r2');

        if (!$disk->exists($filePath)) {
            abort(404, 'File not found');
        }

        $extension = pathinfo($filePath, PATHINFO_EXTENSION);

        $content_type = match ($extension) {
            'html', 'htm' => 'text/html',
            'pdf' => 'application/pdf',
            default => 'application/octet-stream'
        };

        $stream = $disk->readStream($filePath);

        return response()->stream(function () use ($stream) {
            fpassthru($stream);
            fclose($stream);
        }, 200, [
            'Content-Type' => $content_type,
            'Content-Disposition' => 'inline; filename="' . basename($filePath) . '"'
        ]);
    });
});


    Route::prefix("/user")->group(function () {
        Route::post("/verify-token", [UserController::class, "verifyRemeberToken"]);
        Route::post("/is-admin", [UserController::class, "isAdminCheck"]);
        Route::post("/is-superadmin", [UserController::class, "isSuperAdminCheck"]);
        Route::post("/change-semester", [UserController::class, "changeSemester"]);
        Route::post("/new-update", [UpdateController::class, "newUpdate"]);
    });

    Route::prefix("/admin")->middleware(AdminVerify::class)->group(function () {
        Route::post("/new-update", [UpdateController::class, "newUpdate"]);
        Route::get("/getsubjectsbysemester", [SubjectController::class, "getSubjectsBySem"]);
        Route::get('/getsubjects', [SubjectController::class, "getSubjects"]);
        Route::prefix("/note")->group(function () {
            Route::post("/new", [ResourceController::class, "newResource"]);
            Route::get("/get", [ResourceController::class, "getResource"]);
            Route::post("/delete", [ResourceController::class, "deleteResource"]);
        });
        Route::prefix("/link")->group(function(){
            Route::post("/new", [LinkController::class, "newLink"]);
            Route::get("/get", [LinkController::class, "getLink"]);
            Route::middleware(SuperAdminVerify::class)->post("/delete", [LinkController::class, "deleteLink"]);
        });
        Route::prefix("/redirect")->group(function(){
            Route::post("/new", [RedirectController::class, "newRedirect"]);
            Route::get("/get/last10", [RedirectController::class, "getLastTen"]);
        });
        Route::prefix("/events")->group(function(){
            Route::post("/new", [EventController::class, "newEvent"]);
            Route::post("/delete", [EventController::class, "deleteEvent"]);
            Route::get("/getAll", [EventController::class, "getAllEvents"]);
        });
    });

    Route::prefix("/superadmin")->middleware(SuperAdminVerify::class)->group(function () {
        Route::post("/getallmembers", [UserController::class, "getAllMembers"]);
        Route::post("/togglesuperadmin", [UserController::class, "toggleSuperAdmin"]);
        Route::post("/toggleadmin", [UserController::class, "toggleAdmin"]);
        Route::post("/semesterstats", [UserController::class, "getSemesterStats"]);
        Route::prefix("/subject")->group(function () {
            Route::post("/add", [SubjectController::class, "createSubject"]);
            Route::get("/get", [SubjectController::class, "getSubjectsBySem"]);
            Route::post("/delete", [SubjectController::class, "deleteSubject"]);
        });
        Route::prefix("/update")->group(function () {
            Route::post("/new", [UpdateController::class, "newUpdate"]);
            Route::get("/get", [UpdateController::class, "getUpdates"]);
            Route::post("/approve", [UpdateController::class, "approveUpdate"]);
            Route::post("/delete", [UpdateController::class, "deleteUpdate"]);
        });
    });
});
