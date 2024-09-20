import {useState, useEffect} from "react";

const UpdatesSemSelector = ({setSelectedSems}) => {

    const semsInitState = [
        {
            title: "All",
            selected: true,
            value: "all"
        },
        {
            title: "General",
            selected: false,
            value: 0
        },
        {
            title: "Sem 1",
            selected: false,
            value: 1
        },
        {
            title: "Sem 2",
            selected: false,
            value: 2
        },
        {
            title: "Sem 3",
            selected: false,
            value: 3
        },
        {
            title: "Sem 4",
            selected: false,
            value: 4
        },
        {
            title: "Sem 5",
            selected: false,
            value: 5
        },
        {
            title: "Sem 6",
            selected: false,
            value: 6
        },
    ]

    const [sems, setSems] = useState(semsInitState);

    const toggleSems = (target) => {
        if(target == 0 && sems[0].selected == false){
            const newSems = sems.map((sem, i) => {
                if(i == 0 ){
                    sem.selected = true;
                }else{
                    sem.selected = false;
                }
                return sem;
            })
            setSems(newSems);
        }else{
            const newSems = sems.map((sem, i) => {
                if(i == 0){
                    sem.selected = false;
                }
                if(target == i){
                    sem.selected = !sem.selected;
                }
                return sem;
            })
            setSems(newSems);
        }
    }

    useEffect(() => {
        let newSelectedSems = [];
        for(const sem of sems){
            if(sem.selected == true){
                newSelectedSems.push(sem.value);
            }
        }
        setSelectedSems(newSelectedSems);
    }, [sems]);

    return (
        <>
            <div className="flex py-2 max-w-full flex-wrap">
                {sems.map((sem, i) => {
                    return (
                        <>
                            <div onClick={() => toggleSems(i)} className={`${sem.selected ? "bg-[hsl(0,0%,84%)] text-black font-semibold" : ""} cursor-pointer whitespace-nowrap border-[1px] border-[hsl(0,0%,21%)] min-w-[4em] text-center px-2 py-1 rounded mr-1 mb-2`}>
                                <p>{sem.title}</p>
                            </div>
                        </>
                    )
                })}
            </div>
        </>
    )
}

export default UpdatesSemSelector;