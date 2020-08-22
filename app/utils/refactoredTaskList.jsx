
export const refactoredTaskList = (tasks) => {
    let allDates = [];
    let allDatesWithIds = [];
    if (Array.isArray(tasks)) {
        // console.log('tasks=', tasks);
        tasks.map(task =>{
        // console.log('task=', task);    
        if (Array.isArray(task.dates)){
            // console.log('task.dates=', task.dates);
            task.dates.map(date =>{
                // console.log('date=', date);
                allDatesWithIds.push({date: new Date(date.date).getTime(), taskId: task._id});
                allDates.push(new Date(date.date).getTime());
            })
        }
    })
    }
    // console.log('allDates=', allDates);
    // console.log('allDatesWithIds=', allDatesWithIds);
    const sortedAllDates = allDates.sort((a, b) => a - b);
    // console.log('sortedAllDates=', sortedAllDates);
    const sortedallDatesWithIds = allDatesWithIds.sort((a, b) => a.date - b.date);
    // console.log('sortedallDatesWithIds=', sortedallDatesWithIds);
    // let datesForTasksList=[];
    const now = new Date(Date.now()).getTime();
    // console.log('now=', now);
    function unique(arrOfDates) {
        let result = [];
        for (let str of arrOfDates) {
          if (!result.includes(str)) {
            result.push(str);
          }
        }
        return result;
    }
    const uniqueDatesWithIds=(arrOfDates, arrOfDatesWithIds)=>{
        // console.log('arrOfDates=', arrOfDates);
        // console.log('arrOfDatesWithIds=', arrOfDatesWithIds);
        // now>date
        // now<=date
        let resultofDates = [];
        let result = [];
        for (let date of arrOfDates) {
          if (now<=date) {
            if (!resultofDates.includes(date)) {
              resultofDates.push(date);
              result.push({date: date, tasks: arrOfDatesWithIds.reduce(
                (acc, task) => {
                    // console.log('acc=', acc);
                    // console.log('typeof acc=', typeof acc);
                    // console.log('task=', task);
                    // console.log('typeof task=', typeof task);
                    // console.log('task.date===date=', task.date===date);
                    if (task.date!==date) {
                        // console.log('acc after check=', acc);
                        return acc};
                    if (task.date===date) {
                        // console.log('task=', task);
                        const taskToResult =  tasks.filter(elem => elem._id===task.taskId)
                        acc.push(...taskToResult);
                        // console.log('acc after push=', acc);
                        return acc};
                }, []
  
            )});
          }}
          
            
        }
        // console.log('result=', result);
        return result;
    }



    const uniqDates = unique(sortedAllDates);
    const datesWithIds = uniqueDatesWithIds(sortedAllDates, sortedallDatesWithIds);

    // console.log('uniqDates=', uniqDates);
    // console.log('typeof uniqDates=', typeof uniqDates);  
    // console.log('datesWithIds=', datesWithIds);
    // console.log('typeof datesWithIds=', typeof datesWithIds); 
    // console.log('now=', now);
    // console.log('typeof now=', typeof now);
    // const today = new Date();
    // console.log('today=', today);
    // console.log('datesForTasksList=', datesForTasksList);

    

    return datesWithIds;
}

export default refactoredTaskList;