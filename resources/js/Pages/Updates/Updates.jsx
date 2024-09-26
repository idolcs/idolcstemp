import MainWrapper from "../../Layout/MainWrapper";
import UpdateLink from "../Home/LatestUpdates/UpdateLink/UpdateLink";
import UpdatesSemSelector from "./UpdatesSemSelector/UpdatesSemSelector";
import { useState } from "react";

const Updates = ({data}) => {
    const [selectedSems, setSelectedSems] = useState([]);

    console.log(data);

    // const data = [
    //     {
    //         title: "Results announced for Semester 1, Tap here to read more",
    //         date: "12th February 2024",
    //         target: "results-ann-1",
    //         semester: 0,
    //     },
    //     {
    //         title: "We closed an advertisement deal",
    //         date: "12th February 2024",
    //         target: "ads-lala-1",
    //         semester: 1,
    //     },
    //     {
    //         title: "New course introduced: Advanced Data Science",
    //         date: "15th February 2024",
    //         target: "new-course-ads",
    //         semester: 2,
    //     },
    //     {
    //         title: "Semester 1 exams scheduled",
    //         date: "20th February 2024",
    //         target: "exam-schedule-1",
    //         semester: 3,
    //     },
    //     {
    //         title: "New sports facilities opened",
    //         date: "5th March 2024",
    //         target: "sports-open-1",
    //         semester: 4,
    //     },
    //     {
    //         title: "Job fair scheduled for final year students",
    //         date: "10th March 2024",
    //         target: "job-fair-1",
    //         semester: 5,
    //     },
    //     {
    //         title: "Midterm results announced",
    //         date: "15th March 2024",
    //         target: "midterm-results-1",
    //         semester: 6,
    //     },
    //     {
    //         title: "Faculty award ceremony on 20th March",
    //         date: "20th March 2024",
    //         target: "faculty-awards-1",
    //         semester: 0,
    //     },
    //     {
    //         title: "Library upgrade completed",
    //         date: "25th March 2024",
    //         target: "library-upgrade-1",
    //         semester: 1,
    //     },
    //     {
    //         title: "Results announced for Semester 2, Tap here to read more",
    //         date: "30th March 2024",
    //         target: "results-ann-2",
    //         semester: 2,
    //     },
    //     {
    //         title: "New partnership with tech giant",
    //         date: "1st April 2024",
    //         target: "tech-partnership-1",
    //         semester: 3,
    //     },
    //     {
    //         title: "New course on Artificial Intelligence announced",
    //         date: "5th April 2024",
    //         target: "ai-course-1",
    //         semester: 4,
    //     },
    //     {
    //         title: "Guest lecture by industry expert",
    //         date: "10th April 2024",
    //         target: "guest-lecture-1",
    //         semester: 5,
    //     },
    //     {
    //         title: "Alumni meet scheduled for May",
    //         date: "15th April 2024",
    //         target: "alumni-meet-1",
    //         semester: 6,
    //     },
    //     {
    //         title: "New cafeteria menu introduced",
    //         date: "20th April 2024",
    //         target: "cafeteria-menu-1",
    //         semester: 0,
    //     },
    //     {
    //         title: "Semester 2 projects submission deadline extended",
    //         date: "25th April 2024",
    //         target: "proj-deadline-1",
    //         semester: 1,
    //     },
    //     {
    //         title: "Summer internship offers available",
    //         date: "30th April 2024",
    //         target: "internship-offers-1",
    //         semester: 2,
    //     },
    //     {
    //         title: "Semester 3 exams scheduled",
    //         date: "5th May 2024",
    //         target: "exam-schedule-2",
    //         semester: 3,
    //     },
    //     {
    //         title: "University magazine published",
    //         date: "10th May 2024",
    //         target: "magazine-publish-1",
    //         semester: 4,
    //     },
    //     {
    //         title: "New transportation services added",
    //         date: "15th May 2024",
    //         target: "transport-services-1",
    //         semester: 5,
    //     },
    //     {
    //         title: "Midyear conference announcement",
    //         date: "20th May 2024",
    //         target: "conference-ann-1",
    //         semester: 6,
    //     },
    //     {
    //         title: "Results announced for Semester 3, Tap here to read more",
    //         date: "25th May 2024",
    //         target: "results-ann-3",
    //         semester: 0,
    //     },
    //     {
    //         title: "New scholarships available",
    //         date: "30th May 2024",
    //         target: "scholarships-1",
    //         semester: 1,
    //     },
    //     {
    //         title: "Semester 4 project guidelines released",
    //         date: "5th June 2024",
    //         target: "proj-guidelines-1",
    //         semester: 2,
    //     },
    //     {
    //         title: "Annual sports day scheduled",
    //         date: "10th June 2024",
    //         target: "sports-day-1",
    //         semester: 3,
    //     },
    //     {
    //         title: "New entrepreneurship program announced",
    //         date: "15th June 2024",
    //         target: "entrepreneurship-program-1",
    //         semester: 4,
    //     },
    //     {
    //         title: "Semester 4 results announced, Tap here to read more",
    //         date: "20th June 2024",
    //         target: "results-ann-4",
    //         semester: 5,
    //     },
    //     {
    //         title: "Summer classes schedule announced",
    //         date: "25th June 2024",
    //         target: "summer-classes-1",
    //         semester: 6,
    //     },
    //     {
    //         title: "Semester 5 exams scheduled",
    //         date: "1st July 2024",
    //         target: "exam-schedule-3",
    //         semester: 0,
    //     },
    //     {
    //         title: "Graduation ceremony scheduled",
    //         date: "5th July 2024",
    //         target: "graduation-ceremony-1",
    //         semester: 1,
    //     },
    //     {
    //         title: "New course on Blockchain technology announced",
    //         date: "10th July 2024",
    //         target: "blockchain-course-1",
    //         semester: 2,
    //     },
    //     {
    //         title: "Semester 5 results announced, Tap here to read more",
    //         date: "15th July 2024",
    //         target: "results-ann-5",
    //         semester: 3,
    //     },
    //     {
    //         title: "Student exchange program details released",
    //         date: "20th July 2024",
    //         target: "exchange-program-1",
    //         semester: 4,
    //     },
    //     {
    //         title: "Job fair results announced, Tap here to read more",
    //         date: "25th July 2024",
    //         target: "job-fair-results-1",
    //         semester: 5,
    //     },
    //     {
    //         title: "Semester 6 exams scheduled",
    //         date: "1st August 2024",
    //         target: "exam-schedule-4",
    //         semester: 6,
    //     },
    //     {
    //         title: "New research lab inaugurated",
    //         date: "5th August 2024",
    //         target: "research-lab-1",
    //         semester: 0,
    //     },
    //     {
    //         title: "Semester 6 results announced, Tap here to read more",
    //         date: "10th August 2024",
    //         target: "results-ann-6",
    //         semester: 1,
    //     },
    //     {
    //         title: "New cloud computing course introduced",
    //         date: "15th August 2024",
    //         target: "cloud-computing-course-1",
    //         semester: 2,
    //     },
    //     {
    //         title: "New library resources available",
    //         date: "20th August 2024",
    //         target: "library-resources-1",
    //         semester: 3,
    //     },
    //     {
    //         title: "Semester 1 re-exams scheduled",
    //         date: "25th August 2024",
    //         target: "reexam-schedule-1",
    //         semester: 4,
    //     },
    //     {
    //         title: "Results announced for re-exams, Tap here to read more",
    //         date: "30th August 2024",
    //         target: "reexam-results-1",
    //         semester: 5,
    //     },
    //     {
    //         title: "Alumni network expanded",
    //         date: "5th September 2024",
    //         target: "alumni-network-1",
    //         semester: 6,
    //     },
    //     {
    //         title: "Semester 7 project submission guidelines",
    //         date: "10th September 2024",
    //         target: "proj-guidelines-2",
    //         semester: 0,
    //     },
    //     {
    //         title: "New research partnerships announced",
    //         date: "15th September 2024",
    //         target: "research-partnerships-1",
    //         semester: 1,
    //     },
    //     {
    //         title: "Results announced for Semester 7, Tap here to read more",
    //         date: "20th September 2024",
    //         target: "results-ann-7",
    //         semester: 2,
    //     },
    // ];

    return (
        <>
            <p className="font-bold text-[1.5em]">Updates</p>
            <UpdatesSemSelector setSelectedSems={setSelectedSems} />
                { selectedSems.includes("all") ? data.map((update, i) => (
                      <UpdateLink
                          title={update.title}
                          date={update.date}
                        target={`/updates/${update.slug}`}
                      />
                  ))
                : data.map((update, i) =>
                      selectedSems.includes(update.semester) ? (
                          <UpdateLink
                              title={update.title}
                              date={update.date}
                              target={`/updates/${update.slug}`}
                          />
                      ) : null
                  )}
        </>
    );
};

Updates.layout = (page) => <MainWrapper children={page} />;
export default Updates;
