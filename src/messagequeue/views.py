from django.shortcuts import render
from django.http import JsonResponse
from django.views import View

from roster.models import ClusiveUser
from roster.views import set_user_preferences

from .models import Message

import json
import logging

logger = logging.getLogger(__name__)

# TODO: replace with Signals-based code?
def process_messages(queue_timestamp, messages, user, request):    
    for message in messages:
        message["content"]["userId"] = user.id
        message_timestamp = message["timestamp"]
        message_content = message["content"]
        message_type = message["content"]["type"]
        if(message_type == Message.AllowedTypes.PREF_CHANGE):
            logger.debug("Found a preference change message: %s" % message)            
            
            message = Message(message_type, message_timestamp, message_content, request)

            set_user_preferences(user, message_content["preferences"], request)            

class MessageQueueView(View):
    def post(self, request):        
        try:
            receivedQueue = json.loads(request.body)     
            logger.debug("Received a message queue: %s" % receivedQueue);
            queue_timestamp = receivedQueue["timestamp"]
            messages = receivedQueue["messages"]
            user = request.clusive_user
            process_messages(queue_timestamp, messages, user, request)
        except json.JSONDecodeError:
            return JsonResponse(status=501, data={'message': 'Invalid JSON in request body'})        
        return JsonResponse({'success': 1})