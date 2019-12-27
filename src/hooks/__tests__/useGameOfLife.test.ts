import { renderHook, act } from "@testing-library/react-hooks";
import useGameOfLife from "../useGameOfLife";

describe("useGameOfLife", () => {
  it("is initially empty", () => {
    const { result } = renderHook(() => useGameOfLife());

    expect(result.current.isEmpty).toBe(true);
  });

  it("can set a living cell", () => {
    const { result } = renderHook(() => useGameOfLife());

    act(() => {
      result.current.setLivingAt({ x: 1, y: 1 });
    });

    expect(result.current.isEmpty).toBe(false);
    expect(result.current.isAliveAt({ x: 1, y: 1 })).toBe(true);
  });

  describe("rules", () => {
    test("a cell with no living neighbors dies in the next generation", () => {
      const { result } = renderHook(() => useGameOfLife());

      act(() => {
        result.current.setLivingAt({ x: 1, y: 1 });
      });

      expect(result.current.isAliveInNextGeneration({ x: 1, y: 1 })).toBe(
        false
      );
    });

    test("a cell with two or three live neighbors lives to the next generation", () => {
      const { result } = renderHook(() => useGameOfLife());

      act(() => {
        result.current.setLivingAt({ x: 1, y: 1 });
      });
      act(() => {
        result.current.setLivingAt({ x: 1, y: 2 });
      });
      act(() => {
        result.current.setLivingAt({ x: 2, y: 2 });
      });

      expect(result.current.isAliveInNextGeneration({ x: 1, y: 1 })).toBe(true);

      act(() => {
        result.current.setLivingAt({ x: 2, y: 1 });
      });

      expect(result.current.isAliveInNextGeneration({ x: 1, y: 1 })).toBe(true);
    });

    test("a cell with more than three live neighbors dies in the next generation", () => {
      const { result } = renderHook(() => useGameOfLife());

      act(() => {
        result.current.setLivingAt({ x: 2, y: 2 });
      });
      act(() => {
        result.current.setLivingAt({ x: 1, y: 1 });
      });
      act(() => {
        result.current.setLivingAt({ x: 1, y: 2 });
      });
      act(() => {
        result.current.setLivingAt({ x: 1, y: 3 });
      });
      act(() => {
        result.current.setLivingAt({ x: 2, y: 3 });
      });

      expect(result.current.isAliveInNextGeneration({ x: 2, y: 2 })).toBe(
        false
      );
    });

    test("a dead cell with three live neighbors comes alive in the next generation", () => {
      const { result } = renderHook(() => useGameOfLife());

      act(() => {
        result.current.setLivingAt({ x: 1, y: 1 });
      });
      act(() => {
        result.current.setLivingAt({ x: 1, y: 2 });
      });
      act(() => {
        result.current.setLivingAt({ x: 1, y: 3 });
      });

      expect(result.current.isAliveInNextGeneration({ x: 2, y: 2 })).toBe(true);
    });
  });
});
