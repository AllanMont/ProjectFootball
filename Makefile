startprojet:
	@gnome-terminal --tab --working-directory=$(PWD)/backend -- npm run start
	@echo "Backend server started..."

	@gnome-terminal --tab --working-directory=$(PWD)/frontend -- npm run dev
	@echo "Frontend development server started..."

stopall:
	killall node
