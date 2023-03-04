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
import { Link } from "react-router-dom";

export default function CategoriesDrawer({ open, toggleDrawer }) {
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
      anchor="left"
      open={open}
      onClose={() => toggleDrawer(false)}
    >
      <List sx={{ px: 3, mt: 1 }}>
        <ListSubheader>เลือกหมวดหมู่</ListSubheader>
        <ListItemButton
          component={Link}
          to={"/products/categories/all"}
          onClick={() => toggleDrawer(false)}
        >
          <ListItemText>ดูทั้งหมด</ListItemText>
        </ListItemButton>
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
                    component={Link}
                    to={"/products/categories/" + child.categoryUUID}
                    onClick={() => toggleDrawer(false)}
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
