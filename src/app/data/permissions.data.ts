/**
 * Autorization Matrix
 * @description All values must be unique
 */
export var authorizationMatrix = {
    "records": {
        // Each record should follow: View, Add, Edit, then Delete
        "Employee": {
            "View": 'viewEmployee',
            "Add": 'addEmployee',
            "Edit": 'editEmployee',
            "Delete": 'deleteEmployee'
        },
        "Engagement": {
            "View": 'viewEngagement',
            "Add": 'addEngagement',
            "Edit": 'editEngagement',
            "Delete": 'deleteEngagement'
        },
        "Project": {
            "View": 'viewProject',
            "Add": 'addProject',
            "Edit": 'editProject',
            "Delete": 'deleteProject'
        },
        "Team": {
            "View": 'viewTeam',
            "Add": 'addTeam',
            "Edit": 'editTeam',
            "Delete": 'deleteTeam'
        },
        "Performance": {
            "View": 'viewPerformance',
            "Add": 'addPerformance',
            "Edit": 'editPerformance',
            "Delete": 'deletePerformance'
        }
    },
    "special": {
        "Grant Permissions": "grantPermissions",
        "Approve Reporting Period": "approveReportingPeriod"
    }
}
