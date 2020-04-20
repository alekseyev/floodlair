-include Makefile.def


run:
	@echo Starting $(PROJECT_NAME) ...
	gunicorn -b $(BIND_TO):$(RUNSERVER_PORT) --workers=$(NUM_WORKERS) $(PROJECT_NAME).wsgi

runserver:
	$(MANAGE) runserver $(BIND_TO):$(RUNSERVER_PORT)

mailserver:
	python -m smtpd -n -c DebuggingServer $(BIND_TO):$(MAILSERVER_PORT)

shell:
	@echo Starting shell...
	$(MANAGE) shell

clean:
	@echo Cleaning up...
	find ./$(PROJECT_NAME) | grep '\.pyc$$' | xargs -I {} rm {}
	@echo Done

manage:
ifndef CMD
	@echo Please, spceify -e CMD=command argument to execute
else
	$(MANAGE) $(CMD)
endif


#
# end targets

