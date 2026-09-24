import AdminLayout from "../../components/admin/AdminLayout";
import AdminCollection from "../../components/admin/AdminCollection";
import { contentData } from "../../data/data";

export default function PrintsAdminPage() {
  return (
    <AdminLayout>
      <AdminCollection
        kind="prints"
        title={contentData.admin.prints.title}
      />
    </AdminLayout>
  );
}