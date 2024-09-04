<?php

use GuzzleHttp\Psr7\Request;
use Illuminate\Http\Request as HttpRequest;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render("Home/Home");
});

Route::get("/temp", function () {
    return "Hello World";
});

Route::get("/note", function(){
    return Inertia::render("Note/Note");
});

Route::get("/{semesterOrSubject}", function (HttpRequest $request, string $semesterOrSubject) {
    if (
        strlen($semesterOrSubject) == 1 &&
        is_numeric($semesterOrSubject) &&
        (int)$semesterOrSubject <= 6 &&
        (int)$semesterOrSubject >= 1
    ) {
        return Inertia::render("Semester/Semester", ['semNumber' => $semesterOrSubject]);
    } else if (
        strlen($semesterOrSubject) == 3 &&
        is_numeric($semesterOrSubject)
    ) {
        $name = "Programming Algorithms with Python";
        return Inertia::render("Subject/Subject", ["name" => $name]);
    }else{
        return "not a valid semester";
    }
});
