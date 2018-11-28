/**
 * Autorization Matrix
 * @description All values must be unique
 */
export var permissionMatrix = {
    "records": {
        // Each record should follow: View, Add, Edit, then Delete
        "employee": [
            "viewEmployee",
            "addEmployee",
            "editEmployee",
            "deleteEmployee"
        ],
        "engagement": [
            "viewEngagement",
            "addEngagement",
            "editEngagement",
            "deleteEngagement"
        ],
        "project": [
            "viewProject",
            "addProject",
            "editProject",
            "deleteProject"
        ],
        "team": [
            "viewTeam",
            "addTeam",
            "editTeam",
            "deleteTeam"
        ],
        "performance": [
            "viewPerformance",
            "addPerformance",
            "editPerformance",
            "deletePerformance"
        ]
    },
    "specials": [
        "grantPermissions",
        "approveReportingPeriod"
    ],
    "pages": [
        "adminPage",
        "performancePage"
    ]
};