document.getElementById('fuzzForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const protocol = document.getElementById('protocol').value;
    const host = document.getElementById('host').value;
    const port = parseInt(document.getElementById('port').value, 10);
    
    const resultsDiv = document.getElementById('results');
    const resultsContent = document.getElementById('resultsContent');
    
    try {
        const response = await fetch('/api/fuzz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ protocol, host, port })
        });
        
        const data = await response.json();
        
        resultsDiv.classList.remove('hidden');
        resultsContent.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        resultsDiv.classList.remove('hidden');
        resultsContent.textContent = `Error: ${error.message}`;
    }
});