import ProjectCardLoadingState from "./ProjectCardLoadingState";

export default function ProjectGridLoadingState({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <ProjectCardLoadingState key={idx} />
      ))}
    </div>
  );
}
