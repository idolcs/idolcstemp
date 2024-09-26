<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resource extends Model
{
    use HasFactory;

    protected $fillable = [
        "semester",
        "subject",
        "title",
        "description",
        "file",
        "author_email",
        "author_name"
    ];

}
