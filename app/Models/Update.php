<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Update extends Model
{
    use HasFactory;

    protected $fillable = [
        "slug",
        "title",
        "author_email",
        "author_name",
        "content",
        "semester",
        "approved"
    ];

}
