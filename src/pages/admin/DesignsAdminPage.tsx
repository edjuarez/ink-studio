import AdminLayout from "../../components/admin/AdminLayout";
import AdminCollection from "../../components/admin/AdminCollection";
import { contentData } from "../../data/data";

export default function DesignsAdminPage() {
  return (
    <AdminLayout>
      <AdminCollection
        kind="designs"
        title={contentData.admin.designs.title}
      />
    </AdminLayout>
  );
}