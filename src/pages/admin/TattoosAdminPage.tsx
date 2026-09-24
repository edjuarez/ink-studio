import AdminLayout from "../../components/admin/AdminLayout";
import AdminCollection from "../../components/admin/AdminCollection";
import { contentData } from "../../data/data";

export default function TattoosAdminPage() {
  return (
    <AdminLayout>
      <AdminCollection
        kind="tattoos"
        title={contentData.admin.tattoos.title}
      />
    </AdminLayout>
  );
}