<!DOCTYPE html>
<html>
<head>
    <title>SprintBloom</title>
</head>
<body>

<h1>🌱 Sprint Progress</h1>

<p>Progress: <span id="progress">{{ progress }}</span>%</p>

<img id="plant" src="{{ url_for('static', filename=sprite) }}" width="200">

<br><br>

<button onclick="updateProgress(5)">Complete 5 Tasks</button>
<button onclick="updateProgress(10)">Complete 10 Tasks</button>
<button onclick="updateProgress(20)">Complete All</button>

<script>
function updateProgress(tasksDone) {
    fetch(`/update_progress/${tasksDone}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById("progress").innerText = data.progress.toFixed(1);
        document.getElementById("plant").src = data.sprite;
    });
}
</script>

</body>
</html>