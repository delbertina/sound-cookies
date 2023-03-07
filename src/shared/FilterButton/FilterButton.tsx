import './FilterButton.scss';
import { Button } from "@mui/material";
import React from "react";

export interface FilterButtonProps {
  filterText: string;
  filterSelected: boolean;
  filterClicked: () => void;
}

function FilterButton(props: FilterButtonProps) {
  
    return (
      <Button
        variant="contained"
        onClick={() => props.filterClicked()}
        className="filter-button"
        color={props.filterSelected ? 'success' : 'primary'}
      >
        {props.filterText}
      </Button>
    );
  }

  export default FilterButton