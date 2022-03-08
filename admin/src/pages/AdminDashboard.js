import Search from "../components/layout/Search";
import {
    DatePicker, Layout, Row,
    Col,
    Card,
    Radio,
    Table,
    Upload,
    message,
    Progress,
    Button,
    Avatar,
    Skeleton,
    Calendar, Select, Typography, Empty, List, Divider, Space
} from 'antd';
import { Link } from "react-router-dom";


function AdminDashboard() {
    return (
        <Link to="/addClinic">
            <Button type="primary" className="tag-primary">
                Add Clinic Person
            </Button>
        </Link>
    );
}

export default AdminDashboard;