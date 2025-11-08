"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Fragment, useState } from "react"

import { useCurrentProject } from "@/features/project-creator/hooks/use-current-project"
import { BREADCRUMB_LABEL_MAP } from "@olis/core/constants"
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@olis/ui/components/breadcrumb"
import { Button } from "@olis/ui/components/button"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@olis/ui/components/drawer"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@olis/ui/components/dropdown-menu"
import { useIsMobile } from "@olis/ui/hooks/use-mobile"

const BREADCRUMB_ITEMS_TO_DISPLAY = 3

export function AppBreadcrumbs() {
  const pathname = usePathname()
  const segments = pathname.split("/").slice(1)
  const isMobile = useIsMobile()
  const [open, setOpen] = useState(false)
  const inProject = segments.includes("projects") && segments[pathname.split("/").findIndex(segment => segment === "projects") + 1] !== undefined
  const project = useCurrentProject({ enabled: inProject })

  function generateItems() {
    if (isMobile) {
      const isProject = segments[1] === project.data?.id
      const labelMapEntry = BREADCRUMB_LABEL_MAP[segments[1] as keyof typeof BREADCRUMB_LABEL_MAP] || segments[1]
      const label = isProject ? `${project.data?.fullAddress}` : labelMapEntry
      return [
        {
          label,
          isProject,
          isLast: true,
          href: `/${segments[1]}`,
        },
      ]
    }

    return segments.map((segment, index) => {
      const isProject = segment === project.data?.id
      const labelMapEntry = BREADCRUMB_LABEL_MAP[segment as keyof typeof BREADCRUMB_LABEL_MAP] || segment
      const label = isProject ? `${project.data?.fullAddress}` : labelMapEntry

      return {
        label,
        isProject,
        isLast: index === segments.length - 1,
        href: `/${segments.slice(0, segments.indexOf(segment) + 1).join("/")}`,
      }
    })
  }

  const items = generateItems()
  
  return (
    <Breadcrumb>
      <BreadcrumbList>
        { items[0] && (
          <Fragment key="first">
            <BreadcrumbItem>
              <Link href={items[0].href}>
                {items[0].label}
              </Link>
            </BreadcrumbItem>
            {!items[0].isLast && <BreadcrumbSeparator />}
          </Fragment>
        )}
        { items.length > BREADCRUMB_ITEMS_TO_DISPLAY
          ? (
              <>
                <BreadcrumbItem>
                  {!isMobile
                    ? (
                        <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
                          <DropdownMenuTrigger
                            className="flex items-center gap-1"
                            aria-label="Toggle menu"
                          >
                            <BreadcrumbEllipsis className="size-4" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start">
                            {items.slice(1, -2).map(item => (
                              <DropdownMenuItem key={item.label}>
                                <Link href={item.href ? item.href : "#"}>
                                  {item.label}
                                </Link>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )
                    : (
                        <Drawer open={open} onOpenChange={setOpen}>
                          <DrawerTrigger aria-label="Toggle Menu">
                            <BreadcrumbEllipsis className="h-4 w-4" />
                          </DrawerTrigger>
                          <DrawerContent>
                            <DrawerHeader className="text-left">
                              <DrawerTitle>Navigate to</DrawerTitle>
                              <DrawerDescription>
                                Select a page to navigate to.
                              </DrawerDescription>
                            </DrawerHeader>
                            <div className="grid gap-1 px-4">
                              {items.slice(1, -2).map(item => (
                                <Link
                                  key={item.label}
                                  href={item.href ? item.href : "#"}
                                  className="py-1 text-sm"
                                >
                                  {item.label}
                                </Link>
                              ))}
                            </div>
                            <DrawerFooter className="pt-4">
                              <DrawerClose asChild>
                                <Button variant="outline">Close</Button>
                              </DrawerClose>
                            </DrawerFooter>
                          </DrawerContent>
                        </Drawer>
                      )}
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            )
          : null }
        { items.length > 1 && items.slice(1).slice(-BREADCRUMB_ITEMS_TO_DISPLAY + 1).map((item) => {
          return (
            <Fragment key={item.label}>
              <BreadcrumbItem>
                {!item.isLast
                  ? (
                      <BreadcrumbLink
                        asChild
                        className="max-w-20 truncate md:max-w-none"
                      >
                        <Link href={item.href}>{item.label}</Link>
                      </BreadcrumbLink>
                    )
                  : (
                      <BreadcrumbPage className="max-w-20 truncate md:max-w-none">
                        {item.label}
                      </BreadcrumbPage>
                    )}
              </BreadcrumbItem>
              {!item.isLast && <BreadcrumbSeparator />}
            </Fragment>
          )
        }) }

      </BreadcrumbList>
    </Breadcrumb>
  )
}
