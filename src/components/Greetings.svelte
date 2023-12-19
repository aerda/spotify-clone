<script lang="ts">
  const currentTime = new Date()
  const currentHour = currentTime.getHours()

  let greeting = "Good"

  if(currentHour < 12){
    greeting = `${greeting} Morning`
  }else if(currentHour < 18){
    greeting = `${greeting} Afternoon`
  }else{
    greeting = `${greeting} Evening`
  }
</script>

<h1 class="text-white text-3xl font-bold">
  {greeting}
</h1>