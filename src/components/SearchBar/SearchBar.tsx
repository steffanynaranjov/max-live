import { Fragment, Dispatch, SetStateAction, ChangeEvent } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

import { Genre } from "../../api";
import styles from "../../styles/SearchBar.module.css";

type SearchProps = {
  labelText?: string;
  items?: Array<any>;
  selected: Genre;
  setQuery: Dispatch<SetStateAction<string>>;
  setSelected: Dispatch<SetStateAction<Genre>>;
};

export const SearchBar = ({
  selected,
  setQuery,
  setSelected,
  items = [],
}: SearchProps) => {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    const sanitizedQuery = event.target.value.toLowerCase();
    setQuery(sanitizedQuery);
  };

  return (
    <div className={styles.componentSearch}>
      {/* @ts-ignore */}
      <Combobox value={selected.name} onChange={setSelected}>
        <div className={styles.positionSearch}>
          <div className={styles.containerInput}>
            <Combobox.Input
              className={styles.inputSearch}
              onChange={handleQuery}
              placeholder="gender"
              displayValue={(item: any) => item}
            />
            <Combobox.Button className={styles.buttonSearch}>
              <ChevronUpDownIcon
                className={styles.iconInput}
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave=""
            leaveFrom=""
            leaveTo=""
            afterLeave={() => setQuery(selected.name)}>
            <Combobox.Options className={styles.containerOption}>
              {items.length > 0 ? (
                items.map((item: any) => (
                  <Combobox.Option
                    key={item.id}
                    value={item}
                    onClick={() => setSelected(item)}
                    className={({ active }) =>
                      `option-active ${
                        active ? "option-active-select" : "option-inactive"
                      }`
                    }>
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`orientation-list ${
                            selected
                              ? "orientation-list-selected"
                              : "orientation-list-unselected"
                          }`}>
                          {item.name}
                        </span>
                        {selected ? (
                          <span
                            className={`position-center ${
                              active
                                ? "position-center-active"
                                : "position-center-inactive"
                            }`}>
                            <CheckIcon
                              className={styles.checkIcon}
                              aria-hidden="true"
                            />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              ) : (
                <div className={styles.noFound}>Nothing found.</div>
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};
