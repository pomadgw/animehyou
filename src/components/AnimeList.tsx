import styles from "@/styles/AnimeList.module.css";
import { Media } from "@/types/anilist";
import clsx from 'clsx';

export function AnimeList({ media }: { media: Media[]; }) {
  const coverImageStyle = (m: Media) => ({
    "--cover-image": `url(${m.coverImage.large})`,
  } as React.CSSProperties);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {media.map((m) => (
        <div
          key={m.id}
          style={coverImageStyle(m)}
          className={clsx(
            styles["gradient-overlay"],
            "h-72 md:h-96 bg-red-200 bg-cover gradient-overlay flex items-end p-3"
          )}
        >
          {m.title.english}
        </div>
      ))}
    </div>
  );
}
