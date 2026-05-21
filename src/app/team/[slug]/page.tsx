import { TaskDetailPage } from "@/components/tasks/task-detail-page";
import { buildPostMetadata, buildTaskMetadata } from "@/lib/seo";
import { fetchTaskPostBySlug, fetchTaskPosts } from "@/lib/task-data";


export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 3;

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await fetchTaskPostBySlug("org", resolvedParams.slug);
  return post ? await buildPostMetadata("org", post) : await buildTaskMetadata("org");
}

export default async function OrgDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  return <TaskDetailPage task="org" slug={resolvedParams.slug} />;
}
