import { useEffect, useRef, type RefObject } from "react";

export function useScrollToBottom<T extends HTMLElement>(): [
  RefObject<T | null>,
  RefObject<T | null>,
] {
  const containerRef = useRef<T>(null);
  const endRef = useRef<T>(null);

  useEffect(() => {
    const container = containerRef.current;
    const end = endRef.current;

    if (container && end) {
      // DOM 변경 감지 인스턴스 생성
      const observer = new MutationObserver(() => {
        end.scrollIntoView({ behavior: "instant", block: "end" });
      });

      observer.observe(container, {
        childList: true, // 자식노드의 추가나 제거 감지
        subtree: true, // target이 루트인 하위 트리 전체를 주시
      });

      return () => observer.disconnect();
    }
  }, []);

  return [containerRef, endRef];
}
