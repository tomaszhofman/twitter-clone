import { useCallback, useEffect, useMemo, useReducer } from 'react';

type ReadAsMethod = 'readAsText' | 'readAsDataURL' | 'readAsArrayBuffer' | 'readAsBinaryString';

type FileReducer = {
  file: File | null;
  resultFile: string | ArrayBuffer | null;
};
type FileActions =
  | { type: 'SET_FILE'; payload: File }
  | { type: 'SET_RESULT_FILE'; payload: FileReducer['resultFile'] }
  | { type: 'RESET_FILE' };

const initialState: FileReducer = {
  file: null,
  resultFile: null,
};

function fileReducer(state: FileReducer, action: FileActions) {
  switch (action.type) {
    case 'SET_FILE':
      return {
        ...initialState,
        file: action.payload,
      };
    case 'SET_RESULT_FILE': {
      return {
        ...initialState,
        resultFile: action.payload,
      };
    }
    case 'RESET_FILE':
      return {
        ...initialState,
        resultFile: null,
        file: null,
      };
  }
}

type Props = {
  method: ReadAsMethod;
};

export const useFileUpload = (options: Props) => {
  const { method = 'readAsDataURL' } = options;
  const [{ resultFile, file }, dispatch] = useReducer(fileReducer, initialState);

  const setFile = useCallback((data: File) => dispatch({ type: 'SET_FILE', payload: data }), []);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET_FILE' });
  }, []);

  useEffect(() => {
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader[method](file);
    reader.onload = (e: ProgressEvent<FileReader>) => {
      dispatch({ type: 'SET_RESULT_FILE', payload: e.target.result });
    };

    return () => {};
  }, [file, method]);

  return useMemo(
    () => [{ resultFile, file, reset }, setFile] as const,
    [reset, setFile, resultFile, file],
  );
};
