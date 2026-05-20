import { TaskDetailPage } from "@/components/tasks/task-detail-page";
import { buildPostMetadata, buildTaskMetadata } from "@/lib/seo";
import { fetchTaskPostBySlug, fetchTaskPosts } from "@/lib/task-data";

export const revalidate = 3;

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await fetchTaskPostBySlug("comment", resolvedParams.slug);
  return post ? await buildPostMetadata("comment", post) : await buildTaskMetadata("comment");
}

export default async function BlogCommentDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  return <TaskDetailPage task="comment" slug={resolvedParams.slug} />;
}
