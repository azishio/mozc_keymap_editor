import {
	type MozcCommandCategory,
	type MozcEnCommand,
	mozcCommandCategories,
	mozcCommands,
} from "@/mozc_options";
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
	command: MozcEnCommand | null;
	setCommand: Dispatch<SetStateAction<MozcEnCommand | null>>;
}) {
	const [expand, setExpand] = useState<MozcCommandCategory | null>(
		command ? mozcCommands[command].category : null,
	);

	return (
		<>
			<Select
				placeholder={"* 未選択 *"}
				value={command}
				renderValue={(selected) => {
					if (!selected) return null;

					const { category, ja } = mozcCommands[selected.value];
					return (
						<Typography
							startDecorator={
								<Chip component={"span"} variant={"soft"} color={"primary"}>
									{category}
								</Chip>
							}
						>
							{ja}
						</Typography>
					);
				}}
				onChange={(_, newCommand) => setCommand(newCommand)}
			>
				<AccordionGroup>
					<List>
						{mozcCommandCategories.map(({ category, commands }) => (
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
											{commands.map(({ ja, en }, i, l) => (
												<Box key={en}>
													<Option value={en} key={en}>
														<ListItemDecorator>
															<Check sx={{ opacity: command === en ? 1 : 0 }} />
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
