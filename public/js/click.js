document.getElementById('button1').addEventListener('click', function() {
                
    var yElements = document.querySelectorAll('.showline');
    yElements.forEach(function(element) {
        if (!element.classList.contains('gosterme')) {
            element.classList.add("gosterme")
        }
        
    });

    
    var xElement = document.getElementById('home1');
    xElement.classList.remove('gosterme');
});
document.getElementById('button2').addEventListener('click', function() {
                
    var yElements = document.querySelectorAll('.showline');
    yElements.forEach(function(element) {
        if (!element.classList.contains('gosterme')) {
            element.classList.add("gosterme")
        }
        
    });

    
    var xElement = document.getElementById('profile1');
    xElement.classList.remove('gosterme');
});