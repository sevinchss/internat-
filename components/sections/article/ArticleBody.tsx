import type { NewsBlock } from "@/data/news";

/** Renders structured news blocks as rich text (.prose-news). `insert` is placed after block `insertAfter`. */
export function ArticleBody({ blocks, insert, insertAfter = 2 }: { blocks: NewsBlock[]; insert?: React.ReactNode; insertAfter?: number }) {
  const at = Math.min(insertAfter, blocks.length - 1);
  return (
    <div className="prose-news max-w-[68ch]">
      {blocks.map((b, i) => (
        <Block key={i} block={b} after={i === at ? insert : null} first={i === 0} />
      ))}
    </div>
  );
}

function Block({ block, after, first }: { block: NewsBlock; after: React.ReactNode; first: boolean }) {
  let el: React.ReactNode;
  switch (block.type) {
    case "h2":
      el = <h2>{block.text}</h2>;
      break;
    case "quote":
      el = (
        <blockquote>
          <p className="!m-0 !text-[inherit] !leading-[inherit] !text-ink">{block.text}</p>
        </blockquote>
      );
      break;
    case "list":
      el = (
        <ul>
          {block.items.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
      );
      break;
    default:
      el = <p className={first ? "!mt-0 first-letter:font-display first-letter:text-[1.15em] first-letter:text-ink" : undefined}>{block.text}</p>;
  }
  return (
    <>
      {el}
      {after}
    </>
  );
}
