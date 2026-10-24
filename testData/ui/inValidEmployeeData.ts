import type { EmployeeData } from "../../tests/ui/pages/EmployeePage";

export default [
    {
        "frst_name": "First",
        "md_name": "of",
        "lst_name": "his name",
        "employee_tb": "tT-0002",
        "user_name": "Admin",
        "ps": "Password1##",
        "conf_ps": "Password1##",
        "testType": "Username already exists"
    },
    {
        "frst_name": "First",
        "md_name": "of",
        "lst_name": "his name",
        "employee_tb": "T-2-0002",
        "user_name": "t2--002-01",
        "ps": "Password1##",
        "conf_ps": "Password13##",
        "testType": "Passwords do not match"
    }
] satisfies (EmployeeData & { testType: string })[];
