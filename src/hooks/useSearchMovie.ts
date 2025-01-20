import { useCallback, useMemo, useState } from "react";
import { searchSlicerActions } from "../store/reducers";
import { useAppDispatch } from "./storeHooks";
import { eOMDBType, searchMovies, SearchOptionsType } from "../network";
import { generateSearchKey } from "../utils";

export const useSearchMovie = () => {
  const dispatch = useAppDispatch();
  const [options, setOptions] = useState<SearchOptionsType>({
    searchTerm: "",
    page: 1,
  });

  const changeYear = useCallback(
    (year?: number) => {
      setOptions((prevOptions) => {
        const newOptions = { ...prevOptions, year };
        return newOptions;
      });
    },
    [setOptions]
  );

  const changeType = useCallback(
    (type?: eOMDBType) => {
      setOptions((prevOptions) => {
        const newOptions = { ...prevOptions, type };
        return newOptions;
      });
    },
    [setOptions]
  );

  const changeSearchTerm = useCallback(
    (searchTerm: string) => {
      setOptions((prevOptions) => {
        const newOptions = { ...prevOptions, searchTerm };
        return newOptions;
      });
    },
    [setOptions]
  );

  const handleSearch = useCallback(
    async (fields?: SearchOptionsType) => {
      const _options = fields || options;
      console.log("_options", _options);
      if (_options.searchTerm?.trim().length > 0) {
        dispatch(searchSlicerActions.search_requested(_options));

        try {
          const data = await searchMovies(_options);
          dispatch(
            searchSlicerActions.search_success({ data, options: _options })
          );
        } catch (error: Error | any) {
          dispatch(
            searchSlicerActions.search_failure({ error, options: _options })
          );
        }
      }
    },
    [dispatch, options]
  );

  const changePage = useCallback(
    (page: number) => {
      setOptions((prevOptions) => {
        const newOptions = { ...prevOptions, page };
        handleSearch(newOptions);
        return newOptions;
      });
    },
    [setOptions, handleSearch]
  );
  const searchKey = useMemo(() => {
    return generateSearchKey(options);
  }, [options]);

  return {
    options,
    setOptions,
    handleSearch,
    changePage,
    changeSearchTerm,
    changeType,
    changeYear,
    searchKey,
  };
};
