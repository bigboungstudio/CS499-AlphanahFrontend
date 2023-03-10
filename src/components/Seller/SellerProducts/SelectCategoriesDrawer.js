import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Collapse,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

export default function SelectCategoriesDrawer({
  open,
  toggleDrawer,
  handleSelectCategory,
}) {
  const [nestOpen, setNestOpen] = useState({});
  const categories = useSelector((state) => state.categories);
  const levelOne = [...categories.data].filter(
    (category) => category.level === 0
  );
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
