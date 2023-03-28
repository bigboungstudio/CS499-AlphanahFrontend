import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Collapse,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { loadCategories } from "../../../redux/actions/categoryActions";

export default function SelectCategoriesDrawer({
  open,
  toggleDrawer,
  handleSelectCategory,
}) {
  const [nestOpen, setNestOpen] = useState({});
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);
  const [levelOne, setLevelOne] = useState([]);
  useEffect(() => {
    Object.keys(categories).length !== 0 &&
      setLevelOne(
        [...categories.data].filter((category) => category.level === 0)
      );
  }, [categories]);
  function handleOpenNest(id) {
    setNestOpen((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  }

  return (
    <Drawer
      sx={{}}
      anchor="right"
      open={open}
      onClose={() => toggleDrawer(false)}
    >
      <List sx={{ px: 3, mt: 1 }}>
        <ListSubheader>เลือกหมวดหมู่ของสินค้า</ListSubheader>
        {levelOne.map((category, index) => (
          <div key={index}>
            <ListItemButton onClick={() => handleOpenNest(index)}>
              <ListItemText sx={{ pr: 5 }}>{category.name}</ListItemText>
              {nestOpen[index] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={nestOpen[index]} timeout="auto" unmountOnExit>
              <List>
                {category.childCategories.map((child, index) => (
                  <ListItemButton
                    onClick={() => handleSelectCategory(child)}
                    key={index}
                    sx={{ ml: 3 }}
                  >
                    <ListItemText sx={{ pr: 5, color: "#828282" }}>
                      {child.name}
                    </ListItemText>
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </div>
        ))}
      </List>
    </Drawer>
  );
}
