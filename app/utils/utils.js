// Тут пишем функции хелперы, это файл для экспорта тут ничего не должно исполняться

const datesFromTasks = tasks => {
  let result = {};
  result.isCompleted = [];
  result.isDisabled = [];
  if (Array.isArray(tasks)) {
    tasks.map(task => {
      if (Array.isArray(task.dates)) {
        task.dates.map(date => {
          if (date.isComplete) {
            result.isDisabled.push(new Date(date.date).toLocaleDateString());
          } else {
            result.isCompleted.push(new Date(date.date).toLocaleDateString());
          }
        });
      }
    });
  }
  return result;
};

export default datesFromTasks;
