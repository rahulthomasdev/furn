<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use Illuminate\Http\Request;

class FeedbackController extends Controller
{
    public function index()
    {
        $feedbacks = Feedback::where('approved', true)->get();
        return response()->json(['feedbacks' => $feedbacks]);
    }

    public function createFeedback(Request $req)
    {
        $req->validate([
            'uname' => 'required|string',
            'email' => 'required|email',
            'feedback' => 'required|string|min:4',
            'rate' => 'required|numeric|min:0.0|max:5.0'
        ]);
        $feedback = Feedback::create([
            'name' => $req->input('uname'),
            'email' => $req->input('email'),
            'feedback' => $req->input('feedback', null),
            'rate' => $req->input('rate', 2.5),
            'verified_user' => $req->input('verified_user', null)
        ]);
        if ($feedback) {
            return response()->json(['message' => 'Feedback successfully submitted', 'feedback' => $feedback]);
        } else {
            return response()->json(['message' => 'Feedback failed to submit', 'feedback' => $feedback], 422);
        }
    }
}
