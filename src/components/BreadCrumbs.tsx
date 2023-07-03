import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import Link from "next/link";

// Define types
type BreadCrumb = {
  name: string;
  path: string;
};
interface BreadCrumbs extends Array<BreadCrumb> {}
type Props = {
  items: BreadCrumbs | null;
};

const BreadCrumbs = ({ items }: Props): JSX.Element => {
  return (
    <Box component="nav" sx={{ mb: 2 }}>
      <Stack
        component="ol"
        direction="row"
        spacing={1}
        itemScope={true}
        itemType="http://schema.org/BreadcrumbList"
        sx={{ listStyleType: "none" }}
        divider={
          <Typography variant="body1" component="span" sx={{ opacity: 0.7 }}>
            |
          </Typography>
        }
        flexWrap="wrap"
        useFlexGap
      >
        <li itemProp="itemListElement" itemScope={true} itemType="http://schema.org/ListItem">
          {items ? (
            <Link
              href="/#main"
              itemScope={true}
              itemType="http://schema.org/Thing"
              itemProp="item"
              itemID="/#main"
              passHref
            >
              <Typography variant="body2" component="span" itemProp="name" sx={{ opacity: 0.7 }} className="Hover">
                Strona Główna
              </Typography>
            </Link>
          ) : (
            <Box itemScope={true} itemType="http://schema.org/Thing" itemProp="item" itemID="/#main">
              <Typography variant="body2" itemProp="name">
                Strona Główna
              </Typography>
            </Box>
          )}
          <meta itemProp="position" content="0" />
        </li>

        {items &&
          items.map((item, idx) => (
            <li itemProp="itemListElement" itemScope={true} itemType="http://schema.org/ListItem" key={idx}>
              {idx >= items.length - 1 ? (
                <Box itemScope={true} itemType="http://schema.org/Thing" itemProp="item" itemID={item.path}>
                  <Typography variant="body2" component="span" itemProp="name">
                    {item.name}
                  </Typography>
                </Box>
              ) : (
                <Link
                  href={item.path}
                  itemScope={true}
                  itemType="http://schema.org/Thing"
                  itemProp="item"
                  itemID={item.path}
                  passHref
                >
                  <Typography variant="body2" component="span" itemProp="name" sx={{ opacity: 0.6 }} className="Hover">
                    {item.name}
                  </Typography>
                </Link>
              )}

              <meta itemProp="position" content={(idx + 1).toString()} />
            </li>
          ))}
      </Stack>
    </Box>
  );
};

export default BreadCrumbs;
