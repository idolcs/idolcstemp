<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    
    public static function getEvents(Request $request)
    {
        $monthAndYear = $request->query("monthAndYear");
        if (!$monthAndYear) {
            $month = date('m');
            $year = date('Y');
        }else{
            $month = explode("-", $monthAndYear)[0];
            $year = explode("-", $monthAndYear)[1];
        }


        $startDate = $year . '-' . $month . '-01';
        $endDate = date('Y-m-t', strtotime($startDate)); // Gets last day of month dynamically

        $events = Event::where("event_date", ">=", $startDate)
            ->where("event_date", "<=", $endDate)
            ->get();

        $finalEvents = [];

        $daysInMonth = date('t', strtotime($startDate));
        for ($day = 1; $day <= $daysInMonth; $day++) {
            $date = $year . '-' . $month . '-' . str_pad($day, 2, '0', STR_PAD_LEFT);
            $eventData = [
            "day" => date('D', strtotime($date)),
            "date" => $day,
            "events" => []
            ];

            $dayEvents = [];
            foreach ($events as $event) {
                if ($event->event_date == $date) {
                    $dayEvents[] = [
                        "semester" => $event->semester,
                        "title" => $event->title,
                        "description" => $event->description,
                        "link" => $event->link
                    ];
                }
            }
            // Sort by semester
            usort($dayEvents, function ($a, $b) {
                return strcmp($a['semester'], $b['semester']);
            });
            $eventData["events"] = $dayEvents;

            $finalEvents[] = $eventData;
        }


        return response()->json([
            "events" => $finalEvents,
            "monthAndYear" => (string)(date('F Y', strtotime($startDate))),
            "previousMonthAndYear" => (string)(date('m-Y', strtotime($startDate . ' -1 month'))),
            "nextMonthAndYear" => (string)(date('m-Y', strtotime($startDate . ' +1 month')))
        ]);
    }


    public static function newEvent(Request $request)
    {
        $request->validate([
            "title" => "required",
            "description" => "required",
            "semester" => "required|integer",
            "start_date" => "required|date",
            "end_date" => "required|date|after_or_equal:start_date",
            "link" => "required|string"
        ]);


        $datesBetween = [];
        $startDate = \Carbon\Carbon::parse($request->input("start_date"));
        $endDate = \Carbon\Carbon::parse($request->input("end_date"));

        // Loop through each day between start and end date
        while ($startDate->lte($endDate)) {
            $datesBetween[] = $startDate->format('Y-m-d');
            $startDate->addDay();
        }

        // Create events for each date

        foreach ($datesBetween as $date) {
            Event::create([
                "title" => $request->input("title"),
                "description" => $request->input("description"),
                "semester" => $request->input("semester"),
                "event_date" => $date,
                "link" => $request->input("link")
            ]);
        }

        return response()->json([
            "msg" => "Event created successfully",
        ]);
    }

}
