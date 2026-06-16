document.addEventListener('DOMContentLoaded', () => {
    refreshData();
});
let projectsContainer = document.getElementById('projectsContainer');

function refreshData() {
    fetch('/donate/info')
        .then(response => response.json())
        .then(info => {
            info.forEach((_) => {

                let div = document.createElement('div');
                div.className = "panelVert";
                let p1 = document.createElement("p");
                p1.id = "supportText";
                p1.style = "margin-top: 15px;";
                let progress = document.createElement("progress");
                progress.id = "supportBar";
                progress.value = "15";
                progress.max = "100";
                let p2 = document.createElement("p");
                p2.id = "supportMoneyText";
                p2.style = "margin-top: 5px;";
                div.appendChild(p1);
                div.appendChild(progress);
                div.appendChild(p2);
                projectsContainer.appendChild(div);


                let component = _.split("/");
                let supportGet = component.at(1);
                let supportTotal = component.at(2);
                let ratio = supportGet / supportTotal;

                p1.textContent = component.at(0);
                progress.value = ratio * 100;
                p2.textContent = `${supportGet}k/${supportTotal}k VND`;
            })
            
        })
        .catch(error => console.error('Error fetching files:', error));
}