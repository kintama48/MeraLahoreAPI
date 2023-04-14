# Mera Lahore API
This is the official documentation page of Mera Lahore's API. Available routes are: 

## Complaint Routes:
    app.post('/complaints', createComplaint);
    app.get('/complaints', fetchAllComplaints);
    app.delete('/complaints/:id', deleteComplaint);
    app.put('/complaints/:id', updateComplaint);

## Constituency Boundary Routes:
    app.post('/complaints', createComplaint);
    app.get('/complaints', fetchAllComplaints);
    app.delete('/complaints/:id', deleteComplaint);
    app.put('/complaints/:id', updateComplaint);
    
## Government Centers Routes:
    app.post('/centers', createGovernmentCenter);
    app.get('/centers', fetchAllGovernmentCenters);
    app.delete('/centers/:id', deleteGovernmentCenter);
    app.put('/centers/:id', updateGovernmentCenter);
    
## Representatives Routes:
    app.post('/representatives', createRepresentative);
    app.get('/representatives', fetchAllRepresentatives);
    app.delete('/representatives/:id', deleteRepresentative);
    app.put('/representatives/:id', updateRepresentative);
