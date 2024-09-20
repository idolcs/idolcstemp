<?php

use App\Http\Controllers\SubjectController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\AdminVerify;
use App\Http\Middleware\SuperAdminVerify;
use App\Models\Subject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');


Route::prefix("/v1")->group(function(){
    
    Route::prefix("/user")->group(function(){
        Route::post("/verify-token", [UserController::class, "verifyRemeberToken"]);
        Route::post("/is-admin", [UserController::class, "isAdminCheck"]);
        Route::post("/is-superadmin", [UserController::class, "isSuperAdminCheck"]);
        Route::post("/change-semester", [UserController::class, "changeSemester"]);
        // Route::get("/subjects", [SubjectController::class, "getSub"])
    });
    
    Route::prefix("/superadmin")->middleware(SuperAdminVerify::class)->group(function(){
        Route::post("/getallmembers", [UserController::class, "getAllMembers"]);
        Route::post("/togglesuperadmin", [UserController::class, "toggleSuperAdmin"]);
        Route::post("/toggleadmin", [UserController::class, "toggleAdmin"]);
        Route::post("/semesterstats", [UserController::class, "getSemesterStats"]);
        Route::prefix("/subject")->group(function(){
            Route::post("/add", [SubjectController::class, "createSubject"]);
            Route::get("/get", [SubjectController::class, "getSubjectsBySem"]);
            Route::post("/delete", [SubjectController::class, "deleteSubject"]);
        });

    });

    // Route::get("/test", function(){
    //     return "works";
    // })->middleware(AdminVerify::class);

});