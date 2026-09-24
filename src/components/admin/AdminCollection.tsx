import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Check,
  Loader2,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { contentData } from "../../data/data";
import type {
  AdminDesign,
  AdminDesignCategory,
  AdminPrint,
  AdminTattoo,
} from "../../types/admin";
import {
  adminCreateDesign,
  adminCreateDesignCategory,
  adminCreatePrint,
  adminCreateTattoo,
  adminDeleteDesign,
  adminDeletePrint,
  adminDeleteTattoo,
  adminGetDesignCategories,
  adminGetDesigns,
  adminGetPrints,
  adminGetTattoos,
  adminUpdateDesign,
  adminUpdatePrint,
  adminUpdateTattoo,
  adminUploadImage,
} from "../../services/admin";

type CollectionKind = "tattoos" | "designs" | "prints";

type CollectionItem = AdminTattoo | AdminDesign | AdminPrint;

type CollectionUpdate = {
  alt?: string;
  title?: string;
  category_id?: number;
  featured?: number;
  sort_order?: number;
};

type CollectionCreate = {
  image_key: string;
  alt: string;
  title?: string;
  category_id?: number;
  featured?: number;
  sort_order?: number;
};

type Props = {
  kind: CollectionKind;
  title: string;
};

function itemFields(item: CollectionItem) {
  const category_id =
    "category_id" in item ? item.category_id : undefined;

  const category_slug =
    "category_slug" in item ? item.category_slug : undefined;

  const title = "title" in item ? item.title : undefined;

  return { category_id, category_slug, title };
}

function definedRecord(
  patch: CollectionUpdate
): Record<string, string | number> {
  const record: Record<string, string | number> = {};

  if (patch.alt !== undefined) record.alt = patch.alt;
  if (patch.title !== undefined) record.title = patch.title;
  if (patch.category_id !== undefined) record.category_id = patch.category_id;
  if (patch.featured !== undefined) record.featured = patch.featured;
  if (patch.sort_order !== undefined) record.sort_order = patch.sort_order;

  return record;
}

export default function AdminCollection({ kind, title }: Props) {
  const [items, setItems] = useState<CollectionItem[]>([]);
  const [categories, setCategories] = useState<AdminDesignCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [creating, setCreating] = useState(false);

  const defaultSort = useMemo(
    () =>
      items.length > 0
        ? Math.max(...items.map((item) => item.sort_order)) + 1
        : 1,
    [items]
  );

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let result: CollectionItem[];

      if (kind === "tattoos") {
        result = await adminGetTattoos();
      } else if (kind === "designs") {
        result = await adminGetDesigns();
      } else {
        result = await adminGetPrints();
      }

      setItems(result);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Error de servidor");
    } finally {
      setLoading(false);
    }
  }, [kind]);

  useEffect(() => {
    if (kind === "designs") {
      adminGetDesignCategories()
        .then(setCategories)
        .catch(() => setCategories([]));
    }
  }, [kind]);

  const refreshCategories = useCallback(async () => {
    try {
      const result = await adminGetDesignCategories();
      setCategories(result);
    } catch {
      setCategories([]);
    }
  }, []);

  const handleCreateCategory = useCallback(
    async (name: string) => {
      const created = await adminCreateDesignCategory(name);

      await refreshCategories();

      return created;
    },
    [refreshCategories]
  );

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        let result: CollectionItem[];

        if (kind === "tattoos") {
          result = await adminGetTattoos();
        } else if (kind === "designs") {
          result = await adminGetDesigns();
        } else {
          result = await adminGetPrints();
        }

        if (!cancelled) {
          setItems(result);
          setError(null);
          setLoading(false);
        }
      } catch (caught) {
        if (!cancelled) {
          setError(
            caught instanceof Error ? caught.message : "Error de servidor"
          );
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [kind]);

  const handleUpdate = async (id: number, patch: CollectionUpdate) => {
    const record = definedRecord(patch);

    if (Object.keys(record).length === 0) {
      return;
    }

    if (kind === "tattoos") {
      if (patch.alt !== undefined) await adminUpdateTattoo(id, { alt: patch.alt });
      if (patch.featured !== undefined) await adminUpdateTattoo(id, { featured: patch.featured });
      if (patch.sort_order !== undefined) await adminUpdateTattoo(id, { sort_order: patch.sort_order });
    } else if (kind === "designs") {
      if (patch.alt !== undefined) await adminUpdateDesign(id, { alt: patch.alt });
      if (patch.category_id !== undefined) await adminUpdateDesign(id, { category_id: patch.category_id });
      if (patch.featured !== undefined) await adminUpdateDesign(id, { featured: patch.featured });
      if (patch.sort_order !== undefined) await adminUpdateDesign(id, { sort_order: patch.sort_order });
    } else {
      if (patch.alt !== undefined) await adminUpdatePrint(id, { alt: patch.alt });
      if (patch.title !== undefined) await adminUpdatePrint(id, { title: patch.title });
      if (patch.featured !== undefined) await adminUpdatePrint(id, { featured: patch.featured });
      if (patch.sort_order !== undefined) await adminUpdatePrint(id, { sort_order: patch.sort_order });
    }

    await load();
  };

  const handleDelete = async (id: number) => {
    if (kind === "tattoos") {
      await adminDeleteTattoo(id);
    } else if (kind === "designs") {
      await adminDeleteDesign(id);
    } else {
      await adminDeletePrint(id);
    }

    await load();
  };

  const handleCreate = async (input: CollectionCreate) => {
    setCreating(true);

    try {
      if (kind === "tattoos") {
        await adminCreateTattoo({
          image_key: input.image_key,
          alt: input.alt,
          featured: input.featured ?? 0,
          sort_order: input.sort_order ?? defaultSort,
        });
      } else if (kind === "designs") {
        if (input.category_id === undefined) {
          throw new Error("Selecciona una categoría");
        }

        await adminCreateDesign({
          image_key: input.image_key,
          alt: input.alt,
          category_id: input.category_id,
          featured: input.featured ?? 0,
          sort_order: input.sort_order ?? defaultSort,
        });
      } else {
        await adminCreatePrint({
          image_key: input.image_key,
          alt: input.alt,
          title: input.title,
          featured: input.featured ?? 0,
          sort_order: input.sort_order ?? defaultSort,
        });
      }

      await load();
      setAdding(false);
    } finally {
      setCreating(false);
    }
  };

  return (
    <section className="flex flex-col gap-10">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="section-name">{title}</p>
          <span className="text-sm tracking-[0.15em] text-muted">
            {items.length}
          </span>
        </div>

        {!adding && (
          <button
            type="button"
            onClick={() => setAdding(true)}
            className="flex cursor-pointer items-center gap-3 border border-neutral-900 px-6 py-3.5 text-xs uppercase tracking-[0.18em] transition-colors duration-300 hover:bg-neutral-900 hover:text-[#E8E8E8]"
          >
            {kind === "tattoos"
              ? contentData.admin.tattoos.addNew
              : kind === "designs"
                ? contentData.admin.designs.addNew
                : contentData.admin.prints.addNew}
            <Upload size={14} />
          </button>
        )}
      </div>

      {error && (
        <div className="border border-red-300 px-4 py-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {adding && (
        <AddItemForm
          kind={kind}
          categories={categories}
          defaultSort={defaultSort}
          submitting={creating}
          onCancel={() => setAdding(false)}
          onSubmit={handleCreate}
          onCreateCategory={handleCreateCategory}
        />
      )}

      {loading ? (
        <div className="flex items-center justify-center gap-3 py-16 text-sm uppercase tracking-[0.2em] text-neutral-400">
          <Loader2 size={18} className="animate-spin" />
          {contentData.admin.common.loading}
        </div>
      ) : items.length === 0 ? (
        <p className="py-16 text-center text-sm tracking-[0.15em] text-muted">
          {contentData.admin.common.empty}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <CollectionCard
              key={item.id}
              item={item}
              kind={kind}
              categories={categories}
              onSave={(patch) => handleUpdate(item.id, patch)}
              onDelete={() => handleDelete(item.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

// ============================================================
// Add item form
// ============================================================

function AddItemForm({
  kind,
  categories,
  defaultSort,
  submitting,
  onCancel,
  onSubmit,
  onCreateCategory,
}: {
  kind: CollectionKind;
  categories: AdminDesignCategory[];
  defaultSort: number;
  submitting: boolean;
  onCancel: () => void;
  onSubmit: (input: CollectionCreate) => Promise<void>;
  onCreateCategory: (name: string) => Promise<AdminDesignCategory>;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [alt, setAlt] = useState("");
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [localError, setLocalError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [creatingCategory, setCreatingCategory] = useState(false);

  const category = categories.find((c) => c.id === Number(categoryId));

  const prefix =
    kind === "tattoos"
      ? "tattoos/"
      : kind === "prints"
        ? "prints/"
        : category
          ? `designs/${category.slug}/`
          : "";

  const handleCreateCategory = async () => {
    const name = newCategoryName.trim();

    if (!name) {
      return;
    }

    setLocalError(null);
    setCreatingCategory(true);

    try {
      const created = await onCreateCategory(name);

      setCategoryId(created.id);
      setNewCategoryName("");
      setShowNewCategory(false);
    } catch (caught) {
      setLocalError(
        caught instanceof Error ? caught.message : "Error de servidor"
      );
    } finally {
      setCreatingCategory(false);
    }
  };

  const handleFile = (selected: File | null) => {
    setFile(selected);
    setPreview(selected ? URL.createObjectURL(selected) : null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLocalError(null);
    setSuccess(false);

    if (!file) {
      setLocalError("Selecciona una imagen");
      return;
    }

    if (kind === "designs" && !category) {
      setLocalError("Selecciona una categoría");
      return;
    }

    try {
      const upload = await adminUploadImage(file, prefix);

      await onSubmit({
        image_key: upload.image_key,
        alt: alt.trim(),
        title: kind === "prints" ? title.trim() : undefined,
        category_id: kind === "designs" ? category?.id : undefined,
        sort_order: defaultSort,
      });

      setSuccess(true);
      setFile(null);
      setPreview(null);
      setAlt("");
      setTitle("");
      setCategoryId("");
    } catch (caught) {
      setLocalError(
        caught instanceof Error ? caught.message : "Error de servidor"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-neutral-300 bg-surface p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="section-form-label">{contentData.admin.common.upload}</p>

        <p className="text-xs uppercase tracking-[0.18em] text-neutral-400">
          {prefix || "designs/<categoria>/"}
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
        <label
          htmlFor={`upload-${kind}`}
          className="flex min-h-40 cursor-pointer items-center justify-center border border-dashed border-neutral-400 px-6 py-8 text-center transition-colors hover:border-neutral-900"
        >
          {preview ? (
            <img
              src={preview}
              alt="Vista previa"
              className="max-h-64 w-full object-contain"
            />
          ) : (
            <p className="text-sm text-neutral-700">
              {contentData.admin.common.upload}
            </p>
          )}

          <input
            id={`upload-${kind}`}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            onChange={(event) => handleFile(event.target.files?.[0] ?? null)}
          />
        </label>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="section-form-label">
              {kind === "tattoos"
                ? contentData.admin.tattoos.alt
                : kind === "designs"
                  ? contentData.admin.designs.alt
                  : contentData.admin.prints.alt}
            </label>

            <input
              type="text"
              value={alt}
              onChange={(event) => setAlt(event.target.value)}
              placeholder={
                kind === "tattoos"
                  ? contentData.admin.tattoos.altPlaceholder
                  : kind === "designs"
                    ? contentData.admin.designs.altPlaceholder
                    : contentData.admin.prints.altPlaceholder
              }
              className="border-b border-neutral-400 bg-transparent px-0 py-3 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-900"
            />
          </div>

          {kind === "prints" && (
            <div className="flex flex-col gap-2">
              <label className="section-form-label">
                {contentData.admin.prints.titleField}
              </label>

              <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder={contentData.admin.prints.titlePlaceholder}
                className="border-b border-neutral-400 bg-transparent px-0 py-3 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-900"
              />
            </div>
          )}

          {kind === "designs" && (
            <div className="flex flex-col gap-2">
              <div className="flex items-end justify-between gap-4">
                <label className="section-form-label">
                  {contentData.admin.designs.category}
                </label>

                {!showNewCategory && (
                  <button
                    type="button"
                    onClick={() => setShowNewCategory(true)}
                    className="cursor-pointer text-xs uppercase tracking-[0.18em] text-neutral-500 transition-colors hover:text-neutral-900"
                  >
                    + Nueva
                  </button>
                )}
              </div>

              {showNewCategory ? (
                <div className="flex items-end gap-3">
                  <input
                    type="text"
                    value={newCategoryName}
                    onChange={(event) => setNewCategoryName(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        handleCreateCategory();
                      }
                    }}
                    placeholder="Nombre de la categoría"
                    autoFocus
                    disabled={creatingCategory}
                    className="flex-1 border-b border-neutral-400 bg-transparent px-0 py-3 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-900 disabled:opacity-50"
                  />

                  <button
                    type="button"
                    onClick={handleCreateCategory}
                    disabled={creatingCategory || !newCategoryName.trim()}
                    className="flex cursor-pointer items-center gap-2 border border-neutral-900 px-4 py-2.5 text-xs uppercase tracking-[0.18em] transition-colors duration-300 hover:bg-neutral-900 hover:text-[#E8E8E8] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {creatingCategory ? (
                      <Loader2 size={13} className="animate-spin" />
                    ) : (
                      <Check size={13} />
                    )}
                    {contentData.admin.common.save}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowNewCategory(false);
                      setNewCategoryName("");
                      setLocalError(null);
                    }}
                    disabled={creatingCategory}
                    className="flex cursor-pointer items-center gap-2 border border-neutral-900 px-3 py-2.5 text-xs uppercase tracking-[0.18em] transition-colors duration-300 hover:bg-neutral-900 hover:text-[#E8E8E8] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <X size={13} />
                  </button>
                </div>
              ) : (
                <select
                  value={categoryId}
                  onChange={(event) =>
                    setCategoryId(
                      event.target.value === ""
                        ? ""
                        : Number(event.target.value)
                    )
                  }
                  className="border-b border-neutral-400 bg-transparent px-0 py-3 text-sm outline-none focus:border-neutral-900"
                >
                  <option value="">Selecciona</option>

                  {categories.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="section-form-label">
              {kind === "tattoos"
                ? contentData.admin.tattoos.sortOrder
                : kind === "designs"
                  ? contentData.admin.designs.sortOrder
                  : contentData.admin.prints.sortOrder}
            </label>

            <input
              type="number"
              value={defaultSort}
              disabled
              className="border-b border-neutral-400 bg-transparent px-0 py-3 text-sm text-neutral-400 outline-none"
            />
          </div>
        </div>
      </div>

      {localError && (
        <div className="mt-6 border border-red-300 px-4 py-3 text-sm text-red-700">
          {localError}
        </div>
      )}

      {success && (
        <div className="mt-6 flex items-center gap-3 border border-neutral-300 px-4 py-3 text-sm text-neutral-700">
          <Check size={18} />
          {contentData.admin.common.createSuccess}
        </div>
      )}

      <div className="mt-8 flex flex-col gap-4 border-t border-neutral-300 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onCancel}
          disabled={submitting}
          className="flex cursor-pointer items-center justify-center gap-2 border border-neutral-900 px-6 py-3.5 text-xs uppercase tracking-[0.18em] transition-colors duration-300 hover:bg-neutral-900 hover:text-[#E8E8E8] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <X size={14} />
          {contentData.admin.common.cancel}
        </button>

        <button
          type="submit"
          disabled={submitting}
          className="flex cursor-pointer items-center justify-center gap-3 border border-neutral-900 bg-neutral-900 px-6 py-3.5 text-xs uppercase tracking-[0.18em] text-[#E8E8E8] transition-colors duration-300 hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              {contentData.admin.common.saving}
            </>
          ) : (
            <>
              <Upload size={14} />
              {contentData.admin.common.upload}
            </>
          )}
        </button>
      </div>
    </form>
  );
}

// ============================================================
// Collection card
// ============================================================

function CollectionCard({
  item,
  kind,
  categories,
  onSave,
  onDelete,
}: {
  item: CollectionItem;
  kind: CollectionKind;
  categories: AdminDesignCategory[];
  onSave: (patch: CollectionUpdate) => Promise<void>;
  onDelete: () => Promise<void>;
}) {
  const { category_id, title } = itemFields(item);

  const [alt, setAlt] = useState(item.alt);
  const [titleValue, setTitleValue] = useState(title ?? "");
  const [categoryId, setCategoryId] = useState<number>(
    category_id ?? categories[0]?.id ?? 0
  );
  const [featured, setFeatured] = useState(item.featured === 1);
  const [sortOrder, setSortOrder] = useState(item.sort_order);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const dirty =
    alt !== item.alt ||
    (kind === "prints" && titleValue !== (title ?? "")) ||
    (kind === "designs" && categoryId !== (category_id ?? 0)) ||
    featured !== (item.featured === 1) ||
    sortOrder !== item.sort_order;

  const handleSave = async () => {
    setError(null);
    setSuccess(false);
    setSaving(true);

    try {
      const patch: CollectionUpdate = {
        alt: alt.trim() !== item.alt ? alt.trim() : undefined,
        featured:
          featured !== (item.featured === 1)
            ? featured
              ? 1
              : 0
            : undefined,
        sort_order:
          sortOrder !== item.sort_order ? sortOrder : undefined,
        ...(kind === "prints" && titleValue !== (title ?? "")
          ? { title: titleValue.trim() }
          : {}),
        ...(kind === "designs" && categoryId !== (category_id ?? 0)
          ? { category_id: categoryId }
          : {}),
      };

      await onSave(patch);
      setSuccess(true);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Error de servidor");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(contentData.admin.common.confirmDelete)) {
      return;
    }

    setDeleting(true);

    try {
      await onDelete();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Error de servidor");
      setDeleting(false);
    }
  };

  return (
    <article className="flex flex-col border border-neutral-300 bg-surface">
      <div className="aspect-[3/4] overflow-hidden bg-neutral-200">
        {item.image_url ? (
          <img
            src={item.image_url}
            alt={item.alt}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs uppercase tracking-[0.2em] text-neutral-400">
            {contentData.admin.common.noImage}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-5 p-5">
        <div className="flex flex-col gap-2">
          <label className="section-form-label">
            {kind === "tattoos"
              ? contentData.admin.tattoos.alt
              : kind === "designs"
                ? contentData.admin.designs.alt
                : contentData.admin.prints.alt}
          </label>

          <input
            type="text"
            value={alt}
            onChange={(event) => setAlt(event.target.value)}
            className="border-b border-neutral-400 bg-transparent px-0 py-2 text-sm outline-none transition-colors focus:border-neutral-900"
          />
        </div>

        {kind === "prints" && (
          <div className="flex flex-col gap-2">
            <label className="section-form-label">
              {contentData.admin.prints.titleField}
            </label>

            <input
              type="text"
              value={titleValue}
              onChange={(event) => setTitleValue(event.target.value)}
              className="border-b border-neutral-400 bg-transparent px-0 py-2 text-sm outline-none transition-colors focus:border-neutral-900"
            />
          </div>
        )}

        {kind === "designs" && categories.length > 0 && (
          <div className="flex flex-col gap-2">
            <label className="section-form-label">
              {contentData.admin.designs.category}
            </label>

            <select
              value={categoryId}
              onChange={(event) => setCategoryId(Number(event.target.value))}
              className="border-b border-neutral-400 bg-transparent px-0 py-2 text-sm outline-none focus:border-neutral-900"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <label className="section-form-label">
              {kind === "tattoos"
                ? contentData.admin.tattoos.sortOrder
                : kind === "designs"
                  ? contentData.admin.designs.sortOrder
                  : contentData.admin.prints.sortOrder}
            </label>

            <input
              type="number"
              value={sortOrder}
              onChange={(event) => setSortOrder(Number(event.target.value))}
              className="w-24 border-b border-neutral-400 bg-transparent px-0 py-2 text-sm outline-none transition-colors focus:border-neutral-900"
            />
          </div>

          <label className="flex cursor-pointer items-center gap-2 text-xs uppercase tracking-[0.18em] text-neutral-600">
            <input
              type="checkbox"
              checked={featured}
              onChange={(event) => setFeatured(event.target.checked)}
              className="h-4 w-4 cursor-pointer accent-neutral-900"
            />
            {kind === "tattoos"
              ? contentData.admin.tattoos.featured
              : kind === "designs"
                ? contentData.admin.designs.featured
                : contentData.admin.prints.featured}
          </label>
        </div>

        {error && (
          <div className="border border-red-300 px-3 py-2 text-xs text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2 border border-neutral-300 px-3 py-2 text-xs text-neutral-700">
            <Check size={14} />
            {contentData.admin.common.saveSuccess}
          </div>
        )}

        <div className="mt-auto flex gap-3 border-t border-neutral-300 pt-5">
          <button
            type="button"
            onClick={handleSave}
            disabled={!dirty || saving}
            className="flex flex-1 cursor-pointer items-center justify-center gap-2 border border-neutral-900 px-4 py-3 text-xs uppercase tracking-[0.18em] transition-colors duration-300 hover:bg-neutral-900 hover:text-[#E8E8E8] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {saving ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Check size={14} />
            )}
            {contentData.admin.common.save}
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="flex cursor-pointer items-center justify-center border border-red-300 px-4 py-3 text-red-700 transition-colors duration-300 hover:bg-red-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            aria-label={contentData.admin.common.delete}
          >
            {deleting ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Trash2 size={14} />
            )}
          </button>
        </div>
      </div>
    </article>
  );
}