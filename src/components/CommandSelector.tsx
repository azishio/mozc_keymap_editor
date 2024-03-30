import { Command } from "@/classes/command.ts";
import {
	Check,
	KeyboardArrowDown,
	KeyboardArrowRight,
} from "@mui/icons-material";
import {
	Accordion,
	AccordionDetails,
	AccordionGroup,
	AccordionSummary,
	Box,
	Chip,
	List,
	ListDivider,
	ListItem,
	ListItemDecorator,
	ListSubheader,
	Option,
	Select,
	Stack,
	Typography,
	accordionDetailsClasses,
} from "@mui/joy";
import { type Dispatch, type SetStateAction, useState } from "react";

export function CommandSelector({
	command,
	setCommand,
}: {
	command: Command;
	setCommand: Dispatch<SetStateAction<Command>>;
}) {
	const [expand, setExpand] = useState<
		(typeof Command.mozcCommandCategories)[number]["category"] | null
	>(command ? command.getCategory() : null);

	return (
		<>
			<Select
				placeholder={"* 未選択 *"}
				value={command.getEnName()}
				renderValue={() => (
					<>
						<Stack direction={"row"} flexWrap={"wrap"} spacing={1}>
							<Chip component={"span"} variant={"soft"} color={"primary"}>
								{command.getCategory()}
							</Chip>
							<Typography>{command.getJaName()}</Typography>
						</Stack>
					</>
				)}
			>
				<AccordionGroup>
					<List>
						{Command.mozcCommandCategories.map(({ category, commands }) => (
							<ListItem nested key={category}>
								<Accordion
									expanded={expand === category}
									onChange={(_, expanded) =>
										setExpand(expanded ? category : null)
									}
								>
									<ListSubheader
										sticky
										variant={expand === category ? "outlined" : "plain"}
										sx={{ paddingY: 0 }}
									>
										<AccordionSummary
											indicator={null}
											sx={{
												justifyContent: "start",
												flexGrow: 1,
												height: 1,
												paddingY: 0,
											}}
										>
											<ListItemDecorator>
												{expand === category ? (
													<KeyboardArrowDown />
												) : (
													<KeyboardArrowRight />
												)}
											</ListItemDecorator>
											<Typography level={"title-md"}>{category}</Typography>
										</AccordionSummary>
									</ListSubheader>
									<AccordionDetails
										slotProps={{ content: { padding: 0 } }}
										sx={{
											[`& .${accordionDetailsClasses.content}`]: {
												padding: 0,
											},
										}}
									>
										<List>
											{commands.map(({ ja, en }) => (
												<Box key={en}>
													<Option
														value={en}
														key={en}
														onClick={() => {
															setCommand(new Command(en));
															console.log(en);
														}}
													>
														<ListItemDecorator>
															<Check
																sx={{
																	opacity: command.getEnName() === en ? 1 : 0,
																}}
															/>
														</ListItemDecorator>
														<Stack>
															<Typography level={"body-md"}>{ja}</Typography>
															<Typography level={"body-sm"}>{en}</Typography>
														</Stack>
													</Option>
													<ListDivider />
												</Box>
											))}
										</List>
									</AccordionDetails>
								</Accordion>
							</ListItem>
						))}
					</List>
				</AccordionGroup>
			</Select>
		</>
	);
}
